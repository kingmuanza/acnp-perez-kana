import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ACNPDocument } from '../models/document.model';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as firebase from 'firebase';
import {Location} from '@angular/common';


@Component({
  selector: 'app-apercu',
  templateUrl: './apercu.component.html',
  styleUrls: ['./apercu.component.scss']
})
export class ApercuComponent implements OnInit {

  document: ACNPDocument;
  doc = new Document();


  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    console.log('ApercuComponent');
    this.route.paramMap.subscribe(ParamsAsMap => {
      const id = ParamsAsMap.get('id');
      console.log('id');
      console.log(id);
      if (id) {
        const db = firebase.firestore();
        db.collection('documents').doc(id).get().then((doc) => {
          const document = doc.data() as ACNPDocument;
          console.log('ApercuComponent');
          console.log(doc.data());
          this.document = document;
          this.createWordDocument();
        }).catch((e) => {
          console.log(e);
        });
      }
    });
  }

  backClicked() {
    this.location.back();
  }

  createWordDocument() {
    this.doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('Hello World'),
            new TextRun({
              text: 'Foo Bar',
              bold: true,
            }),
            new TextRun({
              text: 'Github is the best',
              bold: true,
            }).tab(),
          ],
        }),
      ],
    });
  }

  exportToWord() {
    console.log('exportToWord');
    Packer.toBuffer(this.doc).then((buffer) => {
      console.log(buffer);
      saveAs.saveAs('MyDocument.docx', buffer);
    });
  }


}
