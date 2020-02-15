import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsableComponent } from './responsable.component';
import { SectionEditComponent } from '../pages/section-edit/section-edit.component';
import { EditChapitreComponent } from '../edit-chapitre/edit-chapitre.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { ResponsableNotificationListComponent } from './responsable-notification-list/responsable-notification-list.component';

const routes: Routes = [{
  path: '',
  component: ResponsableComponent,
  children: [
    { path: '', component: ResponsableDashboardComponent },
    { path: 'edit-section/:iddocument/:idsection', component: EditChapitreComponent },
    { path: 'edit-section', component: EditChapitreComponent },
    { path: 'notifications', component: ResponsableNotificationListComponent },
    { path: 'dashboard', component: ResponsableDashboardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableRoutingModule { }
