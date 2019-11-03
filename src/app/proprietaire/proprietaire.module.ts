import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { ProprietaireComponent } from './proprietaire.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EditStructureComponent } from '../edit-structure/edit-structure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApercuComponent } from '../apercu/apercu.component';


@NgModule({
  declarations: [
    ProprietaireComponent,
    EditStructureComponent,
    ApercuComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ProprietaireRoutingModule
  ]
})
export class ProprietaireModule { }
