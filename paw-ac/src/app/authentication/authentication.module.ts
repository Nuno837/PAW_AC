import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SignupCreateComponent } from './signup/signup.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
    declarations: [
        LoginComponent,
        SignupCreateComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule { }