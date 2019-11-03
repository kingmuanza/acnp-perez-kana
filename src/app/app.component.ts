import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private userService: UtilisateurService) {
    const FIREBASE_CONFIG = {
      apiKey: 'AIzaSyBuCsr_lef4ue-MaR3J47b25Tsvlg96PqE',
      authDomain: 'acnp-anafor.firebaseapp.com',
      databaseURL: 'https://acnp-anafor.firebaseio.com',
      projectId: 'acnp-anafor',
      storageBucket: 'acnp-anafor.appspot.com',
      messagingSenderId: '1085855636989',
      appId: '1:1085855636989:web:e7d98b4f7191e490308d94',
      measurementId: 'G-MPZFC2K3WF'
    };
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  ngOnInit(): void {
    const utilisateurString = localStorage.getItem('ACNPUtilisateur');
    if (utilisateurString) {
      console.log('utilisateurString');
      console.log(utilisateurString);
      const utilisateur = this.userService.getUtilisateur();
      utilisateur.id = JSON.parse(utilisateurString).id;
      utilisateur.nomComplet = JSON.parse(utilisateurString).nomComplet;
      const email = JSON.parse(utilisateurString).email;
      const passe = JSON.parse(utilisateurString).passe;
      const role = JSON.parse(utilisateurString).role;
      if (role === '1') {
        utilisateur.qualite = 'Administrateur';
      }
      this.userService.setUtilisateur(utilisateur);
      this.userService.connexion(email, passe).then(() => {
        console.log('Connexion automatique !');
      });
    } else {
      this.router.navigate(['connexion']);
    }
  }

}
