import { Component, OnInit } from '@angular/core';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-responsable-notification-list',
  templateUrl: './responsable-notification-list.component.html',
  styleUrls: ['./responsable-notification-list.component.scss']
})
export class ResponsableNotificationListComponent implements OnInit {

  notifications = [];
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();

  constructor(private userService: UtilisateurService) {

  }

  ngOnInit() {

    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      this.utilisateur = utilisateur;
      console.log('this.utilisateur');
      console.log(this.utilisateur);
      if (utilisateur.id) {
        this.getNotifications();
      }
    });
    this.userService.emit();

  }

  getNotifications() {
    console.log('getting notifications...');
    const db = firebase.firestore();
    // tslint:disable-next-line:max-line-length
    db.collection('notifications').where('idutilisateurs', 'array-contains', this.utilisateur.id).orderBy('date', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log('doc.data()');
        // console.log(doc.data());
        this.notifications.push(doc.data());
      });

    });
  }



}
