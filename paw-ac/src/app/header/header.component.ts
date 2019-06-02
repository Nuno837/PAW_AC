import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private authenticationSubs: Subscription;
  private admin: boolean;
 

  constructor(private authenticationService: AuthenticationService
  ) { }



  ngOnInit() {

    this.admin = false;

    this.isAuthenticated = this.authenticationService.getIsAuthenticated();


    this.authenticationSubs = this.authenticationService.getAuthenticationStatus()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;

      });
  }

  ifisAdmin() {
    if (this.authenticationService.getIfisAdmin()) {
      this.admin = true;
      return this.admin;
    }
  }
  ngOnDestroy() {
    this.authenticationSubs.unsubscribe();
    this.admin = false;

  }

  Logout() {
    this.authenticationService.logout();
    this.admin = false;
  }
}
