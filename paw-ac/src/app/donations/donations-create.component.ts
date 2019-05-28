import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Donation } from 'src/app/models/donation.model'
import { DonationsService } from 'src/app/services/donations.service';
@Component({
    selector: 'app-donations-create',
    templateUrl: './donations-create.component.html',
    styleUrls: ['./donations-create.component.css']
})

export class DonationsCreateComponent {
    enteredContent = '';
    enteredTitle = '';
    numDon=[];
    public criarDonations: FormGroup;
    @Output() donationsCreated = new EventEmitter();


    constructor(
        private formBuilder: FormBuilder,
        public donationsService: DonationsService,
    ) {
        this.criarDonations = this.formBuilder.group({
            user: ['', [Validators.required]],
            description: ['', [Validators.required]],
            numDon: ['', [Validators.required]]

        
        });
    }

}