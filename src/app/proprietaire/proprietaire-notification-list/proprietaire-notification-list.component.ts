import { Component, OnInit } from '@angular/core';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';

@Component({
  selector: 'app-proprietaire-notification-list',
  templateUrl: './proprietaire-notification-list.component.html',
  styleUrls: ['./proprietaire-notification-list.component.scss']
})
export class ProprietaireNotificationListComponent implements OnInit {

  notifications = [];

  constructor() { }

  ngOnInit() {
    this.sendNotifications();
  }

  sendNotifications() {
    console.log('getting notifications...');
    const db = firebase.firestore();
    db.collection('notifications').orderBy('date', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log('doc.data()');
        console.log(doc.data());
        this.notifications.push(doc.data());
      });

    });
  }


}
