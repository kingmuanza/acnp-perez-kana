import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  registerForm: FormGroup;
  activeForm = true;


  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {

    this.registerForm = this.formBuilder.group({
      nomComplet: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passe: ['', [Validators.required]],
      confirmPasse: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });

  }

  createUser(user) {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').doc(user.id).set(user).then(() => {
        console.log('Document successfully written!');
        resolve(user);
      }).catch((error) => {
        console.error('Error writing document: ', error);
        reject(error);
      });
    });

  }

  createCredentials(email, passe) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, passe).then((result) => {
        console.log('result');
        console.log(result);
        console.log(result.user.uid);
        resolve(result.user.uid);
      }).catch((e) => {
        reject(e);
      });

    });
  }

  onSubmitRegisterForm2() {
    const valueForm = this.registerForm.value;
    console.log('valueForm');
    console.log(valueForm);

  }
  onSubmitRegisterForm() {
    this.activeForm = false;

    const valueForm = this.registerForm.value;
    const passe = this.registerForm.value.passe;
    const confirmPasse = this.registerForm.value.confirmPasse;
    const email = this.registerForm.value.email;
    const user = valueForm;
    if (confirmPasse === passe) {
      this.createCredentials(email, passe).then((uid) => {
        user['id'] = uid;
        console.log(user);
        this.createUser(user).then(() => {
          Metro.notify.create('Utilisateur créé avec success', '', {
            cls: 'success',
            onClose: () => {
              this.router.navigate(['connexion']);
            }
          });
        }).catch((e) => {
          Metro.notify.create(e, '', { cls: 'warning' });
        }).finally(() => {
          this.activeForm = true;
        });
      }).catch((e) => {
        Metro.notify.create(e, '', { cls: 'warning' });
      }).finally(() => {
        this.activeForm = true;
      });
    } else {
      Metro.notify.create('Les mots de passe sont différents', '', { cls: 'warning' });
      this.activeForm = true;
    }
    console.log(valueForm);
  }

  dashboard() {
    this.router.navigate(['pdashboard']);
  }

}
