import { Component, Input, OnInit } from '@angular/core';
import { CampanhaService } from '../../services/campanha.service';
import { Campanha } from '../../models/campanha.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Donation } from 'src/app/models/donation.model';
import { DonationsService } from 'src/app/services/donations.service';

@Component({
  selector: 'app-campanha-list',
  templateUrl: './campanha-list.component.html',
  styleUrls: ['./campanha-list.component.css']
})
export class CampanhaListComponent implements OnInit {
  campanhas: Campanha[] = [];

  donations: Donation[] = [];
  private donationSub: Subscription;

  private campanhaSub: Subscription;
  totalCampanhas = 0;
  campanhaPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  isAuthenticated = false;
  private authenticationSubs: Subscription;
  private admin: boolean;
  totalDonations = 0;



  constructor(
    public campanhaService: CampanhaService, private authenticationService: AuthenticationService, private donationService: DonationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.admin = false;
    this.isAuthenticated = this.authenticationService.getIsAuthenticated();
    if (this.authenticationService.getIfisAdmin()) {
      this.admin = true;
    }
    this.authenticationSubs = this.authenticationService.getAuthenticationStatus()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;

      });

    this.campanhaService.getCampanhas(this.campanhaPerPage, this.currentPage);
    this.campanhaSub = this.campanhaService
      .getCampanhaUpdateListener()
      .subscribe(
        (campanhaData: { campanhas: Campanha[]; campanhaCount: number }) => {
          this.totalCampanhas = campanhaData.campanhaCount;
          this.campanhas = campanhaData.campanhas;
        }
      );

    this.donationService.getDonations(this.campanhaPerPage, this.currentPage);
    this.donationSub = this.donationService
      .getPostUpdateListener()
      .subscribe(
        (donationData: { donations: Donation[]; donationCount: number }) => {
          this.totalDonations = donationData.donationCount;
          this.donations = donationData.donations;
        }
      )


  }


  onDelete(campanhaId: string) {
    this.campanhaService.deleteCampanha(campanhaId).subscribe(() => {
      this.campanhaService.getCampanhas(this.campanhaPerPage, this.currentPage);
    }, () => {
    });
  }
}
