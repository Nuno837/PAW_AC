import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthenticationService{
    private isAuthenticated= false;
    private token : string;



    createUser(
        nome:string,
        username:string,
        password:string,
        IBAN:number,
        NIF:number,
        endereco:string


    ){
        const authenticationData: AuthenticationData = {
            nome,
            username,
            password,
            IBAN,
            NIF,
            endereco
        }

    }
}