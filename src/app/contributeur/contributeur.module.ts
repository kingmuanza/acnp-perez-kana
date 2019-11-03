import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeurRoutingModule } from './contributeur-routing.module';
import { ContributeurComponent } from './contributeur.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SectionEditComponent } from '../pages/section-edit/section-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContributeurComponent,
    SectionEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ContributeurRoutingModule
  ]
})
export class ContributeurModule { }
