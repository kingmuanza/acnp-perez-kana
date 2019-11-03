import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResponsableComponent } from './responsable.component';
import { SectionEditComponent } from '../pages/section-edit/section-edit.component';
import { EditChapitreComponent } from '../edit-chapitre/edit-chapitre.component';

const routes: Routes = [{
  path: '',
  component: ResponsableComponent,
  children: [
    { path: 'edit-section/:iddocument/:idsection', component: EditChapitreComponent },
    { path: 'edit-section', component: EditChapitreComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableRoutingModule { }
