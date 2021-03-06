import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupCreateComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupCreateComponent },


];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [RouterModule]
})

export class AuthenticationRoutingModule {

}
