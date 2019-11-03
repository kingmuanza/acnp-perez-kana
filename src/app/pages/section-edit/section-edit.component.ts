declare const Buffer;

import { Component, OnInit } from '@angular/core';
import { ACNP } from 'src/app/templates/acnp';
import { Section } from 'src/app/models/section.model';
import { Paragraphe } from 'src/app/models/paragraphe.model';
import { ActivatedRoute } from '@angular/router';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { ACNPDocument } from 'src/app/models/document.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Livre } from 'src/app/models/livre.model';
import { Location } from '@angular/common';
import { Image } from 'src/app/models/image.model';

import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  document: ACNPDocument;
  idsection = 0;
  section: Section;
  editcode = 0;
  bibliographieForm: FormGroup;
  imageForm: FormGroup;
  livres = new Array<Livre>();
  image;
  doc = new Document();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private location: Location) { }

  convertDocXToHTML(buffer) {

  }

  base64ToArrayBuffer(base64) {
    const binarystring = window.atob(base64);
    const len = binarystring.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binarystring.charCodeAt(i);
    }
    return bytes.buffer;
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
      this.convertDocXToHTML(buffer);
    });
  }

  ngOnInit() {
    this.exportToWord();
    this.initForm();
    this.document = new ACNPDocument('Test');
    this.route.paramMap.subscribe(ParamsAsMap => {
      const iddocument = ParamsAsMap.get('iddocument');
      const idsection = ParamsAsMap.get('idsection');
      if (iddocument) {
        const db = firebase.firestore();
        db.collection('documents').doc(iddocument).get().then((doc) => {
          const document = doc.data() as ACNPDocument;
          this.document = document;
          for (let i = 0; i < this.document.sections.length; i++) {
            const section = this.document.sections[i];
            for (let j = 0; j < section.contenu.length; j++) {
              const s = section.contenu[j];
              if (s['titre']) {
                if (s.id === idsection) {
                  this.section = s as Section;
                  if (s['livres']) {
                    this.livres = s['livres'] as Array<Livre>;
                  }
                }
              }
            }
          }
        });
      } else {
      }
    });
  }

  effacerTout() {
    const oui = confirm('Etes-vous sûr de vouloir supprimer tout le contenu de cette section');
    if (oui) {
      this.section.contenu = [];
    }
  }

  backClicked() {
    this.location.back();
  }

  saveOnFirebase() {
    const sections = this.document.sections.map((obj) => {
      return Object.assign({}, obj);
    });
    this.document.sections = sections;

    const document = JSON.stringify(this.document);
    console.log(document);
    console.log('JSON.parse(document)');
    console.log(JSON.parse(document));

    const db = firebase.firestore();
    db.collection('documents').doc(this.document.id).set(JSON.parse(document)).then(() => {
      Metro.notify.create('Enregistré', '', { cls: 'success' });
    });
  }

  initForm() {
    this.bibliographieForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      auteur: ['', [Validators.required]]
    });
    this.imageForm = this.formBuilder.group({
      source: ['', [Validators.required]],
      libelle: ['', [Validators.required]]
    });
  }

  onSubmitBibliographieForm() {
    const formValue = this.bibliographieForm.value;
    const livre = new Livre();
    livre.titre = formValue.titre;
    livre.auteur = formValue.auteur;
    this.livres.push(livre);
    this.section.livres = this.livres;
  }
  onSubmitImageForm() {
    const formValue = this.imageForm.value;
    const image = new Image();
    image.src = this.image;
    image.legende = formValue.libelle;
    this.section.contenu.push(image);
  }

  enregistrer() {
    this.saveOnFirebase();
  }

  edit(section) {
    this.editcode = section.id;
  }

  saveSection() {
    this.editcode = 0;
  }

  addSection(section: Section) {
    const numero = section.contenu.length + 1;
    section.contenu.push(new Section('Titre' + numero));
  }

  addParagraphe(section: Section) {
    section.contenu.unshift(new Paragraphe('Nouveau paragraphe'));
  }

  addImage() {
    Metro.dialog.open('#image');
  }

  onFileChange($event) {
    const file = $event.target.files[0]; // <--- File Object for future use.
    console.log('file');
    console.log(file);
    const myReader = new FileReader();
    myReader.onloadend = (e) => {
      console.log('myReader.result');
      console.log(myReader.result);
      this.image = myReader.result;
    };
    myReader.readAsDataURL(file);
    // this.imageForm.controls['source'].setValue(file ? file.name : ''); // <-- Set Value for Validation
  }

  bibliographie() {
    Metro.dialog.open('#bibliographie');
  }


  hasSousTitre(section: Section) {
    // console.log('hasSousTitre');
    if (section.contenu.length > 0) {
      for (let i = 0; i < section.contenu.length; i++) {
        const element = section.contenu[i];
        if (element['titre']) {
          // console.log('True');
          return true;
        }

      }
    }
    return false;
  }

}
