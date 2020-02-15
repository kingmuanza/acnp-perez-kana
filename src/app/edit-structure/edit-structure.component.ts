import { Component, OnInit, HostListener } from '@angular/core';
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
import { Espece } from '../models/espece.model';
import { ACNPNotification } from '../models/acnpnotification.model';

@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.scss']
})
export class EditStructureComponent implements OnInit {

  doc = new Document();
  sectionUse: Section;

  document = new ACNPDocument();
  documentSave = new ACNPDocument();

  notifications = [];

  utilisateurs = [
    /*new Utilisateur('Pr. FOUDA NDJODO'),
    new Utilisateur('Pr. ETOA ETOA Jean Bosco'),
    new Utilisateur('Pr. ZAPFACK Louis'),
    new Utilisateur('Pr. NKENGFACK Augustion')*/
  ];

  contributeurs = [];

  libelleAjoutTitre = 'Modifier un titre';
  contributions = [];
  apercu = false;

  documentForm: FormGroup;
  sectionForm: FormGroup;
  ajouterTitreForm: FormGroup;
  ajouterSousTitreForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UtilisateurService) {
    this.getUtilisateurs();
  }

  supprimerDocument() {
    const oui = confirm('Etes-vous sûr de vouloir supprimer le document ?');
    const db = firebase.firestore();
    if (oui) {
      this.createNotification(null, 'suppressionDocument');
      db.collection('documents').doc(this.document.id).delete().then(() => {
        this.sendNotifications().then(() => {
          Metro.notify.create('Le document a été supprimé', '', { cls: 'success' });
          this.notifications = [];
          this.router.navigate(['proprietaire', 'notifications']);
        });
      });
    }
  }

  setContributeurs() {
    this.document.idcontributeurs = [];
    for (let i = 0; i < this.document.sections.length; i++) {
      const section = this.document.sections[i];
      if (section.utilisateur) {
        this.document.idcontributeurs.push(section.utilisateur.id);
      }
      for (let j = 0; j < section.contenu.length; j++) {
        const s = section.contenu[j];
        if (s['titre']) {
          if (s['utilisateur']) {
            this.document.idcontributeurs.push(s['utilisateur'].id);
          }
        }
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
        localStorage.setItem('ACNPOuvert', id);
        const db = firebase.firestore();
        db.collection('documents').doc(id).get().then((doc) => {
          const document = doc.data() as ACNPDocument;
          this.document = document;
        });
      } else {
        const espece = ParamsAsMap.get('espece');
        const db = firebase.firestore();
        db.collection('especes').doc(espece).get().then((doc) => {
          const e = doc.data() as Espece;
          this.document.espece = e;
        });
      }
    });
    this.initDocumentForm();
    this.initSectionForm();
    this.initAjouterTitreForm();
    this.initSousAjouterTitreForm();
    this.getUtilisateurs();
  }

  getUtilisateurs() {
    this.utilisateurs = [];
    this.contributeurs = [];
    const utilisateursString = localStorage.getItem('ACNPUtilisateurs');
    const utilisateurs = JSON.parse(utilisateursString) as Array<Utilisateur>;
    for (let i = 0; i < utilisateurs.length; i++) {
      const u = utilisateurs[i];
      if (u.qualite) {
        if (JSON.stringify(u.qualite).indexOf('Responsable') !== -1) {
          this.utilisateurs.push(u);
        }
        if (JSON.stringify(u.qualite).indexOf('Contributeur') !== -1) {
          this.contributeurs.push(u);
        }
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
      this.sendNotifications().then(() => {
        Metro.notify.create('Enregistré', '', { cls: 'success' });
        this.notifications = [];
      });
    });
  }

  async sendNotifications() {
    console.log('Sending notifications...');
    const db = firebase.firestore();
    if (this.notifications.length > 0) {
      for (let i = 0; i < this.notifications.length; i++) {
        const notification = this.notifications[i];
        const n = JSON.stringify(notification);
        await db.collection('notifications').doc(notification.id).set(JSON.parse(n));
      }
    }
    this.notifications = [];
  }

  enregistrer() {
    if (this.document.titre) {
      this.saveOnFirebase();
    } else {
      this.editDocument();
    }
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

  ajouterSousTitre(section) {
    this.sectionUse = section;
    Metro.dialog.open('#ajouterSousTitre');
  }

  initAjouterTitreForm() {
    this.ajouterTitreForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      position: ['debut', []],
      utilisateur: [null, [Validators.required]]
    });
  }
  initSousAjouterTitreForm() {
    this.ajouterSousTitreForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      position: ['debut', []],
      utilisateur: [null, [Validators.required]]
    });
  }

  onSubmitAjouterTitreForm() {

    console.log('onSubmitAjouterTitreForm');

    const formValue = this.ajouterTitreForm.value;
    console.log('formValue');
    console.log(formValue);
    const section = new Section(formValue.libelle);
    section.utilisateur = formValue.utilisateur;
    section.newCreee = true;
    console.log('section');
    console.log(section);

    const position = formValue.position;
    if (position === 'debut' || position === 'fin') {
      if (position === 'debut') {
        console.log('La section est au début du document');
        this.document.sections.unshift(section);
      }
      if (position === 'fin') {
        console.log('La section est à la fin du document');
        this.document.sections.push(section);
      }
    } else {
      const sections = [];
      for (let i = 0; i < this.document.sections.length; i++) {
        const s = this.document.sections[i];
        sections.push(s);
        if (s.id === formValue.position) {
          sections.push(section);
        }
      }
      this.document.sections = sections;
    }



    this.initAjouterTitreForm();

    // this.createNotification(section, 'creationSection');
  }

  onSubmitAjouterSousTitreForm() {

    console.log('onSubmitAjouterSousTitreForm');

    const formValue = this.ajouterSousTitreForm.value;
    console.log('formValue');
    console.log(formValue);
    const section = new Section(formValue.libelle);
    section.utilisateur = formValue.utilisateur;
    section.newCreee = true;
    console.log('section');
    console.log(section);

    const position = formValue.position;
    if (position === 'debut' || position === 'fin') {
      if (position === 'debut') {
        console.log('La section est au début du chapitre');
        this.sectionUse.contenu.unshift(section);
      }
      if (position === 'fin') {
        console.log('La section est à la fin du chapitre');
        this.sectionUse.contenu.push(section);
      }
    } else {
      const sections = [];
      for (let i = 0; i < this.sectionUse.contenu.length; i++) {
        const s = this.sectionUse.contenu[i];
        sections.push(s);
        if (s.id === formValue.position) {
          sections.push(section);
        }
      }
      this.sectionUse.contenu = sections;
    }

    this.initSousAjouterTitreForm();

    // this.createNotification(section, 'creationSousSection');
  }

  choisirPosition(value) {
    console.log('value');
    console.log(value);
  }

  onSubmitSectionForm() {

    console.log('onSubmitDocumentForm');
    console.log('Avant');
    const avant = Object.assign({}, this.sectionUse);

    const formValue = this.sectionForm.value;
    this.sectionUse.titre = formValue.libelle;
    this.sectionUse.utilisateur = formValue.utilisateur;
    console.log('Après');
    const apres = Object.assign({}, this.sectionUse);
    console.log('avant');
    console.log(avant);
    console.log('apres');
    console.log(apres);

    if (avant.titre !== apres.titre) {
      console.log('Notification de changement de titre');
      this.createNotification(apres, 'renommage');
    }
    if (avant.utilisateur !== apres.utilisateur) {
      console.log('Notification de changement dutilisateur ');
      this.createNotification(apres, 'attribution');
    }
  }

  createNotification(section: Section, type) {
    const notification = new ACNPNotification();
    notification.date = new Date();
    notification.section = section;
    notification.type = type;
    notification.nomdocument = this.document.titre;
    notification.iddocument = this.document.id;
    notification.utilisateur = this.userService.utilisateur;
    notification.idutilisateurs.push(this.userService.utilisateur.id);
    if (section) {
      if (section.utilisateur) {
        notification.idutilisateurs.push(section.utilisateur.id);
      }
    }
    console.log('notification');
    console.log(notification);
    this.notifications.push(notification);
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
  editSousSection(section) {
    this.libelleAjoutTitre = 'Modifier un titre';
    this.sectionUse = section;
    this.initSectionForm(section);
    Metro.dialog.open('#dialogueSousSection');
    console.log(this.contributeurs);
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
  supprimerSous(section: Section, sous: Section) {
    const oui = confirm('Êtes-vous sûr de vouloir supprimer cette sous section ?');
    const contenu = [];
    if (oui) {
      for (let i = 0; i < section.contenu.length; i++) {
        const s = section.contenu[i];
        if (s.id === sous.id) {

        } else {
          contenu.push(s);
        }
      }
    }
    section.contenu = contenu;
  }

  addSection() {
    Metro.dialog.open('#ajouterTitre');
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
    this.router.navigate(['proprietaire', 'apercu', this.document.id]);
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
