import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProprietaireComponent } from './proprietaire.component';
import { EditStructureComponent } from '../edit-structure/edit-structure.component';
import { ApercuComponent } from '../apercu/apercu.component';
import { ProprietaireNotificationListComponent } from './proprietaire-notification-list/proprietaire-notification-list.component';


const routes: Routes = [{
  path: '',
  component: ProprietaireComponent,
  children: [
    { path: '', component: ProprietaireNotificationListComponent },
    {
      path: 'nouveau-document/:espece',
      component: EditStructureComponent
    },
    { path: 'apercu/:id', component: ApercuComponent }, {
      path: 'nouveau-document',
      component: EditStructureComponent
    }, {
      path: 'manage-document/:id',
      component: EditStructureComponent
    }, {
      path: 'manage-document',
      component: EditStructureComponent
    }, {
      path: 'notifications',
      component: ProprietaireNotificationListComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
