import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ACNPDocument } from '../models/document.model';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import * as firebase from 'firebase';
import { Location } from '@angular/common';


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


  acpnToWord(document: ACNPDocument): Document {

    const doc = new Document({
      creator: document.proprietaire.nomComplet,
      description: document.description,
      title: document.titre
    });

    const elements = [];
    for (let i = 0; i < document.sections.length; i++) {
      // Gestion  des titres 1
      const section = document.sections[i];
      // Libellé des titres 1
      const p = {
        text: section.titre,
        heading: HeadingLevel.HEADING_1
      };
      const titre = new Paragraph(p);
      elements.push(titre);
      // contenu  des titres 1
      for (let j = 0; j < section.contenu.length; j++) {
        const contenu = section.contenu[j];
        if (contenu['texte']) {
          const paragraph = new Paragraph({
            text: contenu['texte'],
          });
          elements.push(paragraph);
        }
        if (contenu['titre']) {
          const paragraph = new Paragraph({
            text: contenu['titre'],
            heading: HeadingLevel.HEADING_2
          });
          elements.push(paragraph);
          for (let k = 0; k < contenu['contenu'].length; k++) {
            const c = contenu['contenu'][k];
            if (c['texte']) {
              const p2 = new Paragraph({
                text: c['texte'],
              });
              elements.push(p2);
            }
            if (contenu['titre']) {
              const p3 = new Paragraph({
                text: c['titre'],
                heading: HeadingLevel.HEADING_3
              });
              elements.push(p3);
            }
          }
        }
      }

    }

    doc.addSection({
      children: elements,
    });
    return doc;

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
    const titre = this.document.titre ? this.document.titre : 'Nouveau document';
    const doc = this.acpnToWord(this.document);
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs.saveAs(blob, titre + '.docx');
    });
  }



}
