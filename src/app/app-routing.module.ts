import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentEditComponent } from './pages/document-edit/document-edit.component';
import { DocumentViewComponent } from './pages/document-view/document-view.component';
import { ProprioComponent } from './pages/dashboard/proprio/proprio.component';
import { Responsable2Component } from './pages/dashboard/responsable/responsable.component';
import { ContributeurComponent } from './pages/dashboard/contributeur/contributeur.component';
import { PropioGuard } from './pages/dashboard/proprio/proprio.guard';
import { ChangerPasseComponent } from './pages/changer-passe/changer-passe.component';
import { ApercuComponent } from './apercu/apercu.component';
import { AccueilComponent } from './pages/accueil/accueil.component';


const routes: Routes = [
  {
    path: 'administration',
    loadChildren: './administrateur/administrateur.module#AdministrateurModule'
  },
  {
    path: 'proprietaire',
    loadChildren: './proprietaire/proprietaire.module#ProprietaireModule'
  },
  {
    path: 'responsable',
    loadChildren: './responsable/responsable.module#ResponsableModule'
  },
  {
    path: 'contributeur',
    loadChildren: './contributeur/contributeur.module#ContributeurModule'
  },
  {
    path: 'invite',
    loadChildren: './invite/invite.module#InviteModule'
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'changer-passe', component: ChangerPasseComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pdashboard', canActivate: [PropioGuard], component: ProprioComponent },
  { path: 'rdashboard', component: Responsable2Component },
  { path: 'cdashboard', component: ContributeurComponent },
  { path: 'manage-document', component: DocumentEditComponent },
  { path: 'manage-document/:id', component: DocumentEditComponent },
  { path: 'view-document', component: DocumentViewComponent },
  { path: '**', redirectTo: 'connexion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
