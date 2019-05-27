import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampanhaCreateComponent } from './campanha/campanha-create/campanha-create.component';
import { HeaderComponent } from './header/header.component';
import {CampanhaListComponent} from './campanha/campanha-list/campanha-list.component';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    CampanhaCreateComponent,
    CampanhaListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
