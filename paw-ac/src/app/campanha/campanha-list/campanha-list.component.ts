import { Component, Input, OnInit } from '@angular/core';
import { CampanhaService } from '../../services/campanha.service';
import { Campanha } from '../../models/campanha.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-campanha-list',
  templateUrl: './campanha-list.component.html',
  styleUrls: ['./campanha-list.component.css']
})
export class CampanhaListComponent implements OnInit {
  campanhas: Campanha[] = [];
  private campanhaSub: Subscription;
  totalCampanhas = 0;
  campanhaPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  isAuthenticated = false;
  private authenticationSubs: Subscription;
  private admin: boolean;



  constructor(
    public campanhaService: CampanhaService, private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

    this.campanhaService.getCampanhas(this.campanhaPerPage, this.currentPage);
    this.campanhaSub = this.campanhaService
      .getPostUpdateListener()
      .subscribe(
        (campanhaData: { campanhas: Campanha[]; campanhaCount: number }) => {
          this.totalCampanhas = campanhaData.campanhaCount;
          this.campanhas = campanhaData.campanhas;
        }
      ); 

  }
  verifyAuthentication() {
    this.admin = false;
    this.isAuthenticated = this.authenticationService.getIsAuthenticated();

    this.authenticationSubs = this.authenticationService.getAuthenticationStatus()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (this.authenticationService.getIfisAdmin()) {
          this.admin = true;
        }
      });

  }
}
