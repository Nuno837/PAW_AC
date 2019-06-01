import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Donation } from 'src/app/models/donation.model'
import { DonationsService } from 'src/app/services/donations.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
    selector: 'app-donations-create',
    templateUrl: './donations-create.component.html',
    styleUrls: ['./donations-create.component.css']
})

export class DonationsCreateComponent implements OnInit {



    public criarDonations: FormGroup;

    donations: Donation[] = [];
    isAuthenticated = false;
    userid: string;
    private userSub: Subscription;
    private authenticationsSub: Subscription;



    constructor(
        private formBuilder: FormBuilder,
        public donationsService: DonationsService,
        private authenticationService: AuthenticationService
    ) {
        this.criarDonations = this.formBuilder.group({
            user: ['', [Validators.required]],
            valor: ['', [Validators.required]],

        });
    }
    onAddDonation() {
        this.donationsService.addDonation(
            this.criarDonations.value.user,
            this.criarDonations.value.valor
        );
        console.log(this.criarDonations);

        this.criarDonations.reset();
    }
    ngOnInit() {
        this.isAuthenticated= this.authenticationService.getIsAuthenticated();
        this.userid = this.authenticationService.getUserId();
        
    }


}