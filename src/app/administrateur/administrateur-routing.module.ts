import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExempleComponent } from '../test/exemple/exemple.component';
import { AdministrateurComponent } from './administrateur.component';
import { EspeceEditComponent } from '../pages/espece/espece-edit/espece-edit.component';
import { EspeceListComponent } from '../pages/espece/espece-list/espece-list.component';
import { UtilisateurEditComponent } from '../pages/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { UtilisateurListComponent } from '../pages/utilisateur/utilisateur-list/utilisateur-list.component';
import { InscriptionComponent } from '../pages/inscription/inscription.component';


const routes: Routes = [{
  path: '',
  component: AdministrateurComponent,
  children: [
    {
      path: 'exemple', component: ExempleComponent
    },
    {
      path: 'espece/edit', component: EspeceEditComponent
    },
    {
      path: 'espece/edit/:id', component: EspeceEditComponent
    },
    {
      path: 'espece/list', component: EspeceListComponent
    },
    {
      path: 'utilisateur/edit', component: InscriptionComponent
    },
    {
      path: 'utilisateur/edit/:id', component: UtilisateurEditComponent
    },
    {
      path: 'utilisateur/list', component: UtilisateurListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
