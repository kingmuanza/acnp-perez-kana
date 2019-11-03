import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    InviteComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    InviteRoutingModule
  ]
})
export class InviteModule { }
