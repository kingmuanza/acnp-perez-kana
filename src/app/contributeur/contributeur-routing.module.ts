import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContributeurComponent } from './contributeur.component';
import { SectionEditComponent } from '../pages/section-edit/section-edit.component';


const routes: Routes = [{
  path: '',
  component: ContributeurComponent,
  children: [
    { path: 'edit-section/:iddocument/:idsection', component: SectionEditComponent },
    { path: 'edit-section', component: SectionEditComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributeurRoutingModule { }
