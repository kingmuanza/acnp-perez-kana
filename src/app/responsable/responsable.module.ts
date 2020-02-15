import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableRoutingModule } from './responsable-routing.module';
import { ResponsableComponent } from './responsable.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditChapitreComponent } from '../edit-chapitre/edit-chapitre.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { ResponsableNotificationListComponent } from './responsable-notification-list/responsable-notification-list.component';


@NgModule({
  declarations: [
    ResponsableComponent,
    EditChapitreComponent,
    ResponsableDashboardComponent,
    ResponsableNotificationListComponent
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
