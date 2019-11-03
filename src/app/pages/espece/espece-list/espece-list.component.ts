import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espece-list',
  templateUrl: './espece-list.component.html',
  styleUrls: ['./espece-list.component.scss']
})
export class EspeceListComponent implements OnInit {

  especes = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getEspeces();
  }

  getEspeces() {
    this.especes = [];
    const db = firebase.firestore();
    db.collection('especes').get().then((querySnapchot) => {
      querySnapchot.forEach((doc) => {
        this.especes.push(doc.data());
      });
    });
  }

  editEspece(espece) {
    this.router.navigate(['administration', 'espece', 'edit', espece.id]);
  }

}
