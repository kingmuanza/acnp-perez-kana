import { Component, OnInit } from '@angular/core';
import { ACNP } from 'src/app/templates/acnp';
import { Section } from 'src/app/models/section.model';
import { Paragraphe } from 'src/app/models/paragraphe.model';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import * as Metro from 'metro4-dist';
import { ACNPDocument } from 'src/app/models/document.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Commentaire } from '../models/commentaire.model';
import { UtilisateurService } from '../services/utilisateur.service';
import { ACNPNotification } from '../models/acnpnotification.model';

@Component({
  selector: 'app-edit-chapitre',
  templateUrl: './edit-chapitre.component.html',
  styleUrls: ['./edit-chapitre.component.scss']
})
export class EditChapitreComponent implements OnInit {

  document: ACNPDocument;
  idsectionConcernee = 0;
  sectionConcernee = ACNP[2];
  editcode = 0;
  commentaireForm: FormGroup;
  commentaires = [];
  sous;
  notifications = [];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UtilisateurService) { }

  ngOnInit() {
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
            if (section.id === idsection) {
              this.sectionConcernee = section;
              if (this.sectionConcernee.commentaires) {
                this.commentaires = this.sectionConcernee.commentaires;
              }
            }
          }
        });
      } else {
      }
    });
  }

  initForm() {
    this.commentaireForm = this.formBuilder.group({
      discours: ['', [Validators.required]]
    });
  }

  onSubmitCommentaireForm() {
    const formValue = this.commentaireForm.value;
    const commentaire = new Commentaire();
    commentaire.utilisateur = this.userService.utilisateur;
    commentaire.discours = formValue.discours;
    this.commentaires.push(commentaire);
    this.sous.commentaires = this.commentaires;
    this.saveOnFirebase();

  }

  addCommentaire(sous) {
    this.sous = sous;
    Metro.dialog.open('#commentaire');
  }

  valider(sous: Section, section: Section) {
    sous.valide = true;
    console.log(sous);
    console.log(this.document.sections);
    section.valide = true;
    for (let i = 0; i < section.contenu.length; i++) {
      const s = section.contenu[i];
      if (s['titre'] && !s['valide']) {
        section.valide = false;
      }
    }
    this.createNotification(sous, 'validation');
    if (section.valide) {
      setTimeout(() => {
        this.createNotification(section, 'validation');
        this.saveOnFirebase();
      }, 1000);
    } else  {
      this.saveOnFirebase();
    }

  }
  unValider(sous: Section, section: Section) {
    sous.valide = false;
    console.log(sous);
    console.log(this.document.sections);
    section.valide = false;
    this.createNotification(sous, 'unvalidation');
    setTimeout(() => {
      this.createNotification(section, 'unvalidation');
      this.saveOnFirebase();
    }, 1000);

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
    if (section.utilisateur) {
      notification.idutilisateurs.push(section.utilisateur.id);
    }
    console.log('notification');
    console.log(notification);
    this.notifications.push(notification);
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
      this.sendNotifications().then(() => {
        Metro.notify.create('Enregistré', '', { cls: 'success' });
        this.notifications = [];
      });
    });
  }

  commenter(sous: Section) {
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
