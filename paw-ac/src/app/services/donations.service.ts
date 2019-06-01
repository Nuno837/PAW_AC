import { Donation } from '../models/donation.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/donations/';
@Injectable({ providedIn: 'root' })
export class DonationsService {
  private donations: Donation[] = [];

  private donationUpdate = new Subject<{ donations: Donation[], donationCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getDonations(donationsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${donationsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; donations: any; maxDonations: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((donationsData) => {
          return {
            donations: donationsData.donations.map(donation => {
              return {
                id: donation._id,
                user: donation.user,
                valor: donation.valor,
                estado: donation.estado,
              };
            }),
            maxDonations: donationsData.maxDonations
          };
        })
      )
      .subscribe(transformedDonationsData => {
        this.donations = transformedDonationsData.donations;
        this.donationUpdate.next({
          donations: [...this.donations],
          donationCount: transformedDonationsData.maxDonations
        });
      });
  }


  getPostUpdateListener() {
    return this.donationUpdate.asObservable();
  }

  addDonation(
    user: string,
    valor: number,
    estado = "PROCESSAMENTO"
  ) {
    const donation: Donation = {
      id: null,
      user,
      valor,
      estado
    };
    console.log(donation);
    this.http.post<{ message: string, donationId: string }>(BACKEND_URL, donation
    )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }
}

