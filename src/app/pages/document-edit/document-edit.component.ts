import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Section } from 'src/app/models/section.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { ACNP } from 'src/app/templates/acnp';
import { ACNPDocument } from 'src/app/models/document.model';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import * as Metro from 'metro4-dist';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {


  doc = new Document();
  sectionUse: Section;

  document = new ACNPDocument();
  documentSave = new ACNPDocument();

  utilisateurs = [
    /*new Utilisateur('Pr. FOUDA NDJODO'),
    new Utilisateur('Pr. ETOA ETOA Jean Bosco'),
    new Utilisateur('Pr. ZAPFACK Louis'),
    new Utilisateur('Pr. NKENGFACK Augustion')*/
  ];

  libelleAjoutTitre = 'Modifier un titre';
  contributions = [];
  apercu = false;

  documentForm: FormGroup;
  sectionForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UtilisateurService) {
    this.getUtilisateurs();
  }

  setContributeurs() {
    this.document.idcontributeurs = [];
    for (let i = 0; i < this.document.sections.length; i++) {
      const section = this.document.sections[i];
      if (section.utilisateur) {
        this.document.idcontributeurs.push(section.utilisateur.id);
      }
    }
  }

  ngOnInit() {
    this.document.sections = ACNP;
    this.sectionUse = this.document.sections[0];
    this.document.proprietaire = this.userService.utilisateur;
    this.route.paramMap.subscribe(ParamsAsMap => {
      const id = ParamsAsMap.get('id');
      if (id) {
        const db = firebase.firestore();
        db.collection('documents').doc(id).get().then((doc) => {
          const document = doc.data() as ACNPDocument;
          this.document = document;
        });
      } else {
      }
    });
    this.initDocumentForm();
    this.initSectionForm();
    this.getUtilisateurs();
  }

  getUtilisateurs() {
    this.utilisateurs = [];
    const utilisateursString = localStorage.getItem('ACNPUtilisateurs');
    const utilisateurs = JSON.parse(utilisateursString) as Array<Utilisateur>;
    for (let i = 0; i < utilisateurs.length; i++) {
      const u = utilisateurs[i];
      if (u.qualite === 'Responsable') {
        this.utilisateurs.push(u);
      }
    }
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

  /* Formulaires */
  // Formulaire Document
  initDocumentForm() {
    this.documentForm = this.formBuilder.group({
      titre: [this.document.titre ? this.document.titre : '', [Validators.required]],
      description: [this.document.description ? this.document.description : '', []]
    });
  }

  onSubmitDocumentForm() {
    console.log('onSubmitDocumentForm');
    const formValue = this.documentForm.value;
    this.document.titre = formValue.titre;
    this.document.description = formValue.description;
    console.log('this.document');
    console.log(this.document);
    this.saveOnFirebase();
  }

  saveOnFirebase() {
    this.setContributeurs();
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

  enregistrer() {
    this.saveOnFirebase();
  }
  // Formulaire Document
  initSectionForm(section?: Section) {
    if (section) {
      this.sectionUse = section;
      this.sectionForm = this.formBuilder.group({
        libelle: [section.titre, [Validators.required]],
        utilisateur: [section.utilisateur ? section.utilisateur : null, [Validators.required]]
      });
    } else {
      this.sectionForm = this.formBuilder.group({
        libelle: ['', [Validators.required]],
        utilisateur: [null, [Validators.required]]
      });
    }
  }

  onSubmitSectionForm() {
    console.log('onSubmitDocumentForm');
    const formValue = this.sectionForm.value;
    this.sectionUse.titre = formValue.libelle;
    this.sectionUse.utilisateur = formValue.utilisateur;
    console.log(this.sectionUse);
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

  edit_section() {
    this.router.navigate(['edit-section']);
  }

  editSection(section) {
    this.libelleAjoutTitre = 'Modifier un titre';
    this.sectionUse = section;
    this.initSectionForm(section);
    Metro.dialog.open('#demoDialog1');
    console.log(this.utilisateurs);
  }

  supprimer(section) {
    const oui = confirm('Êtes-vous sûr de vouloir supprimer cette section ?');
    if (oui) {
      const sections = [];
      for (let i = 0; i < this.document.sections.length; i++) {
        const s = this.document.sections[i];
        if (s.id === section.id) {

        } else {
          sections.push(s);
        }
      }
      this.document.sections = sections;
    }
  }

  addSection() {
    this.libelleAjoutTitre = 'Ajouter un titre';
    const longueur = this.document.sections.length + 1;
    const titre = 'Titre ' + longueur;
    const section = new Section(titre);
    this.document.sections.push(section);
    this.sectionUse = section;
    this.initSectionForm();
    Metro.dialog.open('#demoDialog1');
  }

  valider(section: Section) {
    const oui = confirm('Êtes-vous sûr de vouloir valider cette section ?');
    if (oui) {
      section.valide = true;
      this.saveOnFirebase();

    }
  }

  unValider(section) {

    const oui = confirm('La section ne sera plus validée. Êtes-vous sûr de vouloir mener cette action ?');
    if (oui) {
      section.valide = false;
      this.saveOnFirebase();

    }

  }

  change() {
    console.log(this.sectionUse);
    console.log(this.utilisateurs);
  }

  voir() {
    this.apercu = true;
  }

  unVoir() {
    this.apercu = false;
  }

  editDocument() {
    this.initDocumentForm();
    Metro.dialog.open('#demoDialog2');
  }

  annuler() {

  }


}
