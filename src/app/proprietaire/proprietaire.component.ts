import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ACNPDocument } from 'src/app/models/document.model';
import { Espece } from '../models/espece.model';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss']
})
export class ProprietaireComponent implements OnInit {

  documents = [];
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();
  especes = [];
  idACNPOUvert = '0';

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.idACNPOUvert = localStorage.getItem('ACNPOuvert');
    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      this.utilisateur = utilisateur;
      this.refresh();
    });
    this.userService.emit();
    // this.refresh();

  }

  refresh() {
    this.getDocuments();
    this.getUtilisateurs();
    this.getEspeces();
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
        user.qualite = '';
        if (JSON.stringify(doc.data().role).indexOf('0') !== -1) {
          user.qualite += 'Administrateur';
        }
        if (JSON.stringify(doc.data().role).indexOf('1') !== -1) {
          user.qualite += 'Propriétaire';
        }
        if (JSON.stringify(doc.data().role).indexOf('2') !== -1) {
          user.qualite += 'Responsable';
        }
        if (JSON.stringify(doc.data().role).indexOf('3') !== -1) {
          user.qualite += 'Contributeur';
        }
        utilisateurs.push(user);
      });
      console.log('this.utilisateurs');
      console.log(utilisateurs);
      localStorage.setItem('ACNPUtilisateurs', JSON.stringify(utilisateurs));
      console.log(that.utilisateurs);
    });
  }
  getEspeces() {
    const especesString = localStorage.getItem('ACNPEspeces');
    if (especesString) {
      this.especes = JSON.parse(especesString);
    }
  }


  getDocuments() {
    this.documents = [] ;
    const db = firebase.firestore();
    db.collection('documents').get().then((querySnapshot) => {
      console.log('Resultats');
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('doc.data()');
        console.log(doc.data());
        if (doc.data().proprietaire.id === this.utilisateur.id) {

          this.documents.push(doc.data());
        }
      });

    });

  }

  deconnexion() {
    const oui = confirm('Êtes-vous sûr de vouloir quitter l\'application ?');
    if (oui) {
      this.userService.deconnexion();
      this.router.navigate(['connexion']);
    }
  }

  changerPasse() {
    this.router.navigate(['changer-passe']);
  }

  voirNotifications() {
    this.router.navigate(['proprietaire', 'notifications']);
  }

  nouveauDocument() {
    Metro.dialog.open('#choixmodele');
  }

  inscription() {
    this.router.navigate(['inscription']);
  }

  nouveauACNP(espece?: Espece) {
    console.log('nouveau document');
    Metro.dialog.close('#choixmodele');
    if (espece) {
      this.router.navigate(['proprietaire', 'nouveau-document', espece.id]);
    } else {
      this.router.navigate(['proprietaire', 'nouveau-document']);
    }
  }
  nouveauVierge() {
    console.log('nouveau document');
    Metro.dialog.close('#choixmodele');
    this.router.navigate(['proprietaire', 'manage-document']);
  }

  ouvrir(d: ACNPDocument) {
    this.idACNPOUvert = d.id;
    this.router.navigate(['proprietaire', 'manage-document', d.id]);
  }

  utilisateurs() {

  }

  validations() {

  }


}
