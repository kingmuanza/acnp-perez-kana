import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.scss']
})
export class AdministrateurComponent implements OnInit {

  utilisateurs = [];
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.userService.emit();
  }

  nouveauEspece() {
    this.router.navigate(['administration', 'espece', 'edit']);
  }
  listEspece() {
    this.router.navigate(['administration', 'espece', 'list']);
  }
  nouveauUtilisateur() {
    this.router.navigate(['administration', 'utilisateur', 'edit']);
  }

  listUtilisateur() {
    this.router.navigate(['administration', 'utilisateur', 'list']);
  }

  changerPasse() {
    this.router.navigate(['changer-passe']);
  }

  deconnexion() {
    const oui = confirm('Êtes-vous sûr de vouloir quitter l\'application ?');
    if (oui) {
      this.userService.deconnexion();
      this.router.navigate(['connexion']);
    }
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
      this.utilisateurs = utilisateurs;
    });
  }

}
