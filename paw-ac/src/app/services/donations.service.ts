import { Donation } from '../models/donation.model';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root'})
export class DonationsService {
  private donations: Donation[] = [];

  addDonation(
    user: string,
    numDon: number
  ) {
    const donation: Donation = {
      user,
      numDon
    };
  }
}
