import { Injectable } from '@angular/core';
import { AuthenticationData } from './authentication-data-model';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthenticationService{
    private isAuthenticated= false;
    private token : string;
    private authStatusListener = new Subject<boolean>();

    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }

    createUser(
        nome:string,
        username:string,
        password:string,
        endereco:string,
        latlng: string,
        iban:number,
        nif:number


    ){
        const authenticationData: AuthenticationData = {
            nome,
            username,
            password,
            endereco,
            latlng,
            iban,
            nif
        }

    }
}
