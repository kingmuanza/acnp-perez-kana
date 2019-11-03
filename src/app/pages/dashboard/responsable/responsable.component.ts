import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ACNPDocument } from 'src/app/models/document.model';
import { Section } from 'src/app/models/section.model';


@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss']
})
export class Responsable2Component implements OnInit {

  documents = [];
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.userService.emit();
    this.getDocuments();
    this.getUtilisateurs();

  }

  isMySection(section: Section) {
    if (section.utilisateur) {
      if (section.utilisateur.id === this.utilisateur.id) {
        return true;
      }
    }
    return false;
  }

  sectionsValidees(document: ACNPDocument) {
    let nombre = 0;
    for (let i = 0; i < document.sections.length; i++) {
      const section = document.sections[i];
      if (section.valide) {
        nombre++;
      }
    }
    return nombre;
  }

  getUtilisateurs() {
    const utilisateurs = [];
    const db = firebase.firestore();
    const that = this;
    db.collection('utilisateurs').get().then((querySnapchot) => {
      querySnapchot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('utilisateurs');
        console.log('doc.data()');
        console.log(doc.data());
        const user = new Utilisateur(doc.data().nomComplet);
        user.id = doc.data().id;
        if (doc.data().role === '1') {
          user.qualite = 'Administrateur';
        }
        if (doc.data().role === '2') {
          user.qualite = 'Responsable';
        }
        if (doc.data().role === '1') {
          user.qualite = 'Contributeur';
        }
        utilisateurs.push(user);
      });
      console.log('this.utilisateurs');
      console.log(utilisateurs);
      localStorage.setItem('ACNPUtilisateurs', JSON.stringify(utilisateurs));
      console.log(that.utilisateurs);
    });
  }


  getDocuments() {
    const db = firebase.firestore();
    db.collection('documents').get().then((querySnapshot) => {
      console.log('Resultats');
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('doc.data()');
        console.log(doc.data());
        const idcontributeurs = doc.data().idcontributeurs;
        console.log('idcontributeurs');
        console.log(idcontributeurs);
        console.log('this.utilisateur.id');
        console.log(this.utilisateur.id);
        if (idcontributeurs.indexOf(this.utilisateur.id) > -1) {
          if (this.ifDocumentInDocuments(doc.data())) {

          } else {

            this.documents.push(doc.data());
          }
        }
      });
      console.log('this.documents');
      console.log(this.documents);

    });

  }

  ifDocumentInDocuments(document) {
    for (let i = 0; i < this.documents.length; i++) {
      const doc = this.documents[i];
      if (doc.id === document.id) {
        return true;
      }
    }
    return false;

  }

  deconnexion() {
    const oui = confirm('Êtes-vous sûr de vouloir quitter l\'application ?');
    if (oui) {
      this.userService.deconnexion();
      this.router.navigate(['connexion']);
    }
  }

  redaction(document: ACNPDocument, section: Section) {
    this.router.navigate(['edit-section', document.id, section.id]);
  }

  changerPasse() {
    this.router.navigate(['changer-passe']);
  }

  nouveauDocument() {
    Metro.dialog.open('#choixmodele');
  }

  inscription() {
    this.router.navigate(['inscription']);
  }

  nouveauACNP() {
    console.log('nouveau document');
    Metro.dialog.close('#choixmodele');
    this.router.navigate(['manage-document']);
  }
  nouveauVierge() {
    console.log('nouveau document');
    Metro.dialog.close('#choixmodele');
    this.router.navigate(['manage-document']);
  }

  ouvrir(d: ACNPDocument) {
    this.router.navigate(['manage-document', d.id]);
  }

  utilisateurs() {

  }

  validations() {

  }


}
