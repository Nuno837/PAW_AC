import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { CampanhaService } from '../services/campanha.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class ListagemUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private userSub: Subscription;
  isLoading = false;
  totalUsers = 0;
  usersPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  totalGasto = 0;

  constructor(
  private authenticationService: AuthenticationService,
  private campanhaService: CampanhaService,
  private router: Router) { }

  ngOnInit() {

    this.isLoading = true;
    this.authenticationService.getUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authenticationService.getUserId();
    this.userSub = this.authenticationService.getUsersUpdated()
      .subscribe(
        (userData: { users: User[]; userCount: number }) => {
          this.isLoading = false;
          this.totalUsers = userData.userCount;
          this.users = userData.users;
        }
      );
    this.userIsAuthenticated = this.authenticationService.getIsAuthenticated();
    this.authStatusSub = this.authenticationService
      .getAuthenticationStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authenticationService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.authenticationService.getUsers(this.usersPerPage, this.currentPage);

  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.authenticationService.deleteUser(userId).subscribe(() => {
      this.authenticationService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
