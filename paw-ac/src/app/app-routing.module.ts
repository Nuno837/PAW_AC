import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampanhaListComponent } from './campanha/campanha-list/campanha-list.component';
import { CampanhaCreateComponent } from './campanha/campanha-create/campanha-create.component';

const routes: Routes = [
  {path: '', component: CampanhaListComponent},
  {path: 'create-campanha', component: CampanhaCreateComponent},
  {path: 'list-campanha', component: CampanhaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
