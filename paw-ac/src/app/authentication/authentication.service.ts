import { Injectable } from '@angular/core';
import { AuthenticationData } from './authentication-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


const USER_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private isAuthenticated = false;
  private token: string;
  private authenticationStatus = new Subject<boolean>();
  private userid: string;
  admin = false;
  private tokenTimer: any;

  private users: User[] = [];
  private usersUpdated = new Subject<{users: User[], userCount: number}>();


  constructor(private http: HttpClient, private router: Router) { }



  createUser(
    nome: string,
    username: string,
    password: string,
    endereco: string,
    latlng: string,
    iban: string,
    nif: number


  ) {
    const authenticationData: AuthenticationData = {
      nome,
      username,
      password,
      endereco,
      latlng,
      iban,
      nif
    }; this.http
      .post(USER_URL + 'signup', authenticationData)
      .subscribe(response => {
        this.router.navigate(['/login']);
      }, error => {
        error.error.message = 'O username introduzido já se encontra registado!';
        this.authenticationStatus.next(false);
      });
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userid;
  }

  getAuthenticationStatus() {
    return this.authenticationStatus.asObservable();
  }

  getIfisAdmin() {
    return this.admin;
  }

  getUsersUpdated() {
    return this.usersUpdated.asObservable();
  }

  login(username: string, password: string) {
    const loginData = {
      username,
      password
    };
    this.http
      .post<{ token: string, expiresIn: number, userid: string }>(
        USER_URL + 'login',
        loginData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresDuration = response.expiresIn;
          this.setAuthenticationTimer(expiresDuration);
          this.isAuthenticated = true;
          this.userid = response.userid;
          this.authenticationStatus.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresDuration * 1000);
          this.saveAuthenticationData(token, expirationDate, this.userid);
          if (this.userid === '5cf3eb8f5a325f087402a274') {
            this.admin = true;
            this.router.navigate(['/']); //como é admin por enquanto vai para aqui
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.router.navigate(['/login']);
        }
      }, error => {
        this.authenticationStatus.next(false);
        this.router.navigate(['/login']);
      });
  }

  autoAuthenticationUser() {
    const authInformation = this.getAuthenticationData();
    if (!authInformation) {
      this.router.navigate(['/login']);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userid = authInformation.userid;
      this.setAuthenticationTimer(expiresIn / 1000);
      if (this.userid === '5cf3eb8f5a325f087402a274') {
        this.admin = true;
        this.authenticationStatus.next(true);
      }
      this.authenticationStatus.next(true);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUsers(userPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${userPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        USER_URL + 'listar/' + queryParams
      )
      .pipe(
        map((usersData) => {
        return {
          users: usersData.users.map(user => {
            return {
              id: user._id,
              nome: user.nome,
              username: user.username,
              endereco: user.endereco,
              latlng: user.latlng,
              iban: user.iban,
              nif: user.nif
            };
          }),
          maxUsers: usersData.maxUsers
        };
      })
    )
      .subscribe(transformedUsersData => {
        this.users = transformedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUsersData.maxUsers
        });
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authenticationStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthenticationData();
    this.userid = null;
    this.admin = false;
    this.router.navigate(['/login']);
  }

  private setAuthenticationTimer(expirationTimer: number) {
    console.log('Setting timer: ' + expirationTimer);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer * 1000);
  }

  private saveAuthenticationData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userid', userId);
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userid');
  }

  private getAuthenticationData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userid = localStorage.getItem('userid');
    if (!token && !expirationDate) {
      this.router.navigate(['/login']);
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userid,
    };
  }

  deleteUser(userId: string) {
    return this.http.delete(USER_URL + 'listar/' + userId);
  }

}
