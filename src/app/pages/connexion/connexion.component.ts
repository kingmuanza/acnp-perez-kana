import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  encoursDeConnexion = false;

  constructor(private userService: UtilisateurService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initConnexionForm();
  }

  initConnexionForm() {
    this.connexionForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      passe: ['', [Validators.required]]
    });
  }

  onSubmitConnexionForm() {
    this.encoursDeConnexion = true;
    const formValue = this.connexionForm.value;
    console.log(formValue);
    const login = formValue.login;
    const passe = formValue.passe;
    this.userService.connexion(login, passe).then((resultat: any) => {
      console.log(resultat);
      this.encoursDeConnexion = false;
      localStorage.setItem('ACNPUtilisateur', JSON.stringify(resultat));
      this.getEspeces().then(() => {
        this.router.navigate(['accueil']);
        /*
        if (resultat.role === '0') {
          this.router.navigate(['administration']);
        }
        if (resultat.role === '1') {
          this.router.navigate(['proprietaire']);
        }
        if (resultat.role === '2') {
          this.router.navigate(['responsable']);
        }
        if (resultat.role === '3') {
          this.router.navigate(['contributeur']);
        } */
      }).catch((e) => {
        console.log(e);
      });
    }).catch((e) => {
      console.log(e);
      Metro.notify.create('Aucun utilisateur trouvé !!!', '', { cls: 'warning' });
    });
  }

  getEspeces() {
    const especes = [];
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('especes').get().then((querySnapchot) => {
        querySnapchot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log('especes');
          console.log('doc.data()');
          console.log(doc.data());
          especes.push(doc.data());
        });
        console.log('this.especes');
        console.log(especes);
        localStorage.setItem('ACNPEspeces', JSON.stringify(especes));
        resolve(especes);
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    });
  }

  setQualite(qualite) {
    const utilisateur = this.userService.getUtilisateur();
    utilisateur.qualite = qualite;
    this.userService.setUtilisateur(utilisateur);
    console.log(utilisateur);
  }

  connexion(role) {
    if (role === 'P') {
      this.setQualite('Propriétaire');
      this.router.navigate(['pdashboard']);
    }
    if (role === 'R') {
      this.setQualite('Responsable');
      this.router.navigate(['rdashboard']);
    }
    if (role === 'C') {
      this.setQualite('Contributeur');
      this.router.navigate(['cdashboard']);
    }
  }

}
