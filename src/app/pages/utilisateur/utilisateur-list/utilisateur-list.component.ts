import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as Metro from 'metro4-dist';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {

  utilisateurs = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getUtilisateurs();
  }

  getUtilisateurs() {
    this.utilisateurs = [];
    const db = firebase.firestore();
    db.collection('utilisateurs').get().then((querySnapchot) => {
      querySnapchot.forEach((doc) => {
        console.log(doc.data());
        this.utilisateurs.push(doc.data());
      });
    });
  }

  editUtilisateur(utilisateur) {
    // this.router.navigate(['administration', 'utilisateur', 'edit', utilisateur.id]);
  }

}
