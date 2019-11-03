import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-changer-passe',
  templateUrl: './changer-passe.component.html',
  styleUrls: ['./changer-passe.component.scss']
})
export class ChangerPasseComponent implements OnInit {


  registerForm: FormGroup;
  activeForm = true;


  constructor(private router: Router, private userService: UtilisateurService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {

    this.registerForm = this.formBuilder.group({
      ancien: ['', [Validators.required]],
      nouveau: ['', [Validators.required]],
      confirmation: ['', [Validators.required]]
    });

  }

  onSubmitRegisterForm() {
    const formValue = this.registerForm.value;
    const ancien = formValue.ancien;
    const nouveau = formValue.nouveau;
    const confirmation = formValue.confirmation;
    const utilisateurString = localStorage.getItem('ACNPUtilisateur');
    const utilisateur = JSON.parse(utilisateurString);
    if (ancien === utilisateur.passe) {
      if (nouveau === confirmation) {
        firebase.auth().currentUser.updatePassword(nouveau).then(() => {
          utilisateur.passe = nouveau;
          localStorage.setItem('ACNPUtilisateur', JSON.stringify(utilisateur));
          this.router.navigate(['connexion']);
        });
      } else {
        Metro.notify.create('Les mots de passe ne sont pas identiques', '', { cls: 'warning' });
      }
    } else {
      Metro.notify.create('Erreur d\'authentification !!!', '', { cls: 'warning' });
    }


  }

  dashboard() {
    this.router.navigate(['pdashboard']);
  }
}
