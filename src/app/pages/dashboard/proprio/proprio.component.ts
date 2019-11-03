import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ACNPDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-proprio',
  templateUrl: './proprio.component.html',
  styleUrls: ['./proprio.component.scss']
})
export class ProprioComponent implements OnInit {

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
        if (doc.data().role === '3') {
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
