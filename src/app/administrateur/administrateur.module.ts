import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrateurRoutingModule } from './administrateur-routing.module';
import { ExempleComponent } from '../test/exemple/exemple.component';
import { AdministrateurComponent } from './administrateur.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EspeceEditComponent } from '../pages/espece/espece-edit/espece-edit.component';
import { EspeceListComponent } from '../pages/espece/espece-list/espece-list.component';
import { UtilisateurListComponent } from '../pages/utilisateur/utilisateur-list/utilisateur-list.component';
import { UtilisateurEditComponent } from '../pages/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { InscriptionComponent } from '../pages/inscription/inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExempleComponent,
    AdministrateurComponent,
    EspeceEditComponent,
    EspeceListComponent,
    UtilisateurEditComponent,
    UtilisateurListComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AdministrateurRoutingModule
  ]
})
export class AdministrateurModule { }
