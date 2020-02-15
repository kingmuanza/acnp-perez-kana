import { Injectable, OnInit } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: Utilisateur;
  utilisateurSubject = new Subject();

  constructor() {
    this.utilisateur = new Utilisateur('');
  }

  emit() {
    this.utilisateurSubject.next(this.utilisateur);
  }

  connexion(login, passe) {
    this.utilisateur = new Utilisateur('');
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(login, passe).then((resultat) => {
        console.log('resultat');
        console.log(resultat);
        const idutilisateur = resultat.user.uid;
        this.getUtilisateurInfos(idutilisateur).then((user: any) => {
          if (user) {
            this.utilisateur.qualite = '';
            this.utilisateur.nomComplet = user.nomComplet;
            this.utilisateur.id = user.id;

            if (JSON.stringify(user.role).indexOf('0') !== -1) {
              this.utilisateur.qualite += 'Administrateur';
            }
            if (JSON.stringify(user.role).indexOf('1') !== -1) {
              this.utilisateur.qualite += 'Propriétaire';
            }
            if (JSON.stringify(user.role).indexOf('2') !== -1) {
              this.utilisateur.qualite += 'Responsable';
            }
            if (JSON.stringify(user.role).indexOf('3') !== -1) {
              this.utilisateur.qualite += 'Contributeur';
            }
            this.emit();
            resolve(user);
          } else {
            reject(null);
          }
        }).catch((e) => {
          reject(e);
        });
      }).catch((e) => {
        reject(e);
      });
    });
  }

  deconnexion() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut().then(() => {

      });
    }
    localStorage.removeItem('ACNPUtilisateur');
    this.utilisateur = null;
    this.emit();
  }

  getUtilisateurInfos(idutilisateur) {
    console.log('getUtilisateurInfos');
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      db.collection('utilisateurs').doc(idutilisateur).get().then((doc) => {
        if (doc.exists) {
          console.log('Document data:');
          console.log(doc.data());
          resolve(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          reject(null);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  setUtilisateur(utilisateur) {
    this.utilisateur = utilisateur;
    this.emit();
  }
  getUtilisateur() {
    return this.utilisateur;
  }


}
