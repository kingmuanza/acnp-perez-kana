import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Espece } from 'src/app/models/espece.model';
import * as firebase from 'firebase';
import * as Metro from 'metro4-dist';

@Component({
  selector: 'app-espece-edit',
  templateUrl: './espece-edit.component.html',
  styleUrls: ['./espece-edit.component.scss']
})
export class EspeceEditComponent implements OnInit {

  espece: Espece;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(ParamsAsMap => {
      const id = ParamsAsMap.get('id');
      if (id) {
        const db = firebase.firestore();
        db.collection('especes').doc(id).get().then((doc) => {
          console.log('espece');
          console.log(doc.data());
          this.espece = doc.data() as Espece;
        });
      } else {
        this.espece = new Espece('Nouvelle espèce');
      }
    });
  }

  enregistrer() {
    const db = firebase.firestore();
    db.collection('especes').doc(this.espece.id).set(this.espece).then(() => {
      Metro.notify.create('Enregistré', '', { cls: 'success' });
    });
  }

}
