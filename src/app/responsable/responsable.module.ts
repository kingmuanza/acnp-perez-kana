import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditChapitreComponent } from '../edit-chapitre/edit-chapitre.component';


@NgModule({
  declarations: [
    ResponsableComponent,
    EditChapitreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ResponsableRoutingModule
  ]
})
export class ResponsableModule { }
