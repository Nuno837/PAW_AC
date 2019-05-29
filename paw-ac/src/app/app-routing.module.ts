import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampanhaListComponent } from './campanha/campanha-list/campanha-list.component';
import { CampanhaCreateComponent } from './campanha/campanha-create/campanha-create.component';
import { DonationsCreateComponent } from './donations/donations-create.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupCreateComponent } from './authentication/signup/signup.component';


const routes: Routes = [
  {path: '', component: CampanhaListComponent},
  {path: 'create-campanha', component: CampanhaCreateComponent},
  {path: 'list-campanha', component: CampanhaListComponent},
  {path: 'create-don', component: DonationsCreateComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupCreateComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
