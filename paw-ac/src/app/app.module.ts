import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampanhaCreateComponent } from './campanha/campanha-create/campanha-create.component';
import { HeaderComponent } from './header/header.component';
import { CampanhaListComponent } from './campanha/campanha-list/campanha-list.component';

import { AngularMaterialModule } from './angular-material.module';
import { DonationsCreateComponent } from './donations/donations-create.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupCreateComponent } from './authentication/signup/signup.component';
import { AuthenticationInterceptor } from './authentication/authentication-Int';
import { from } from 'rxjs';
import { UserListComponent } from './listUsers/users-list.component';



@NgModule({
  declarations: [
    AppComponent,
    CampanhaCreateComponent,
    CampanhaListComponent,
    DonationsCreateComponent,
    LoginComponent,
    SignupCreateComponent,
    HeaderComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavbarModule,
    FormsModule,
    WavesModule,
    ButtonsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
