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


  ngOnDestroy() {
    this.authenticationSubs.unsubscribe();
    this.admin = false;
  
  }

  ngOnInit() {
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

  Logout() {
    this.authenticationService.logout();
    this.admin = false;
  }
}
