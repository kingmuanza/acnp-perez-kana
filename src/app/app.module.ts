import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentEditComponent } from './pages/document-edit/document-edit.component';
import { ProprioComponent } from './pages/dashboard/proprio/proprio.component';
import { Responsable2Component } from './pages/dashboard/responsable/responsable.component';
import { ContributeurComponent } from './pages/dashboard/contributeur/contributeur.component';
import { ValidationsComponent } from './pages/validations/validations.component';
import { DisplayDocumentsComponent } from './components/display-documents/display-documents.component';
import { PropioGuard } from './pages/dashboard/proprio/proprio.guard';
import { MenuGaucheComponent } from './components/menu-gauche/menu-gauche.component';
import { ChangerPasseComponent } from './pages/changer-passe/changer-passe.component';
import { AdministrateurModule } from './administrateur/administrateur.module';
import { ProprietaireModule } from './proprietaire/proprietaire.module';
import { ResponsableModule } from './responsable/responsable.module';
import { ContributeurModule } from './contributeur/contributeur.module';
import { InviteModule } from './invite/invite.module';
import { DocumentViewComponent } from './pages/document-view/document-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    DashboardComponent,
    DocumentEditComponent,
    DocumentViewComponent,
    ProprioComponent,
    Responsable2Component,
    ContributeurComponent,
    ValidationsComponent,
    DisplayDocumentsComponent,
    MenuGaucheComponent,
    ChangerPasseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AdministrateurModule,
    ProprietaireModule,
    ResponsableModule,
    ContributeurModule,
    InviteModule
  ],
  providers: [
    PropioGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
