import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      this.utilisateur = utilisateur;
      if (utilisateur.id) {

      }
    });
    this.userService.emit();
  }

  isAdministrateur(utilisateur: Utilisateur) {
    return utilisateur.qualite.indexOf('Administrateur') !== -1 ;
  }
  isProprietaire(utilisateur: Utilisateur) {
    return utilisateur.qualite.indexOf('Propriétaire') !== -1 ;
  }
  isResponsable(utilisateur: Utilisateur) {
    return utilisateur.qualite.indexOf('Responsable') !== -1 ;
  }
  isContributeur(utilisateur: Utilisateur) {
    return utilisateur.qualite.indexOf('Contributeur') !== -1 ;
  }

  goToAdministrateur() {
    this.router.navigate(['administration']);
  }
  goToProprietaire() {
    this.router.navigate(['proprietaire']);
  }
  goToResponsable() {
    this.router.navigate(['responsable']);
  }
  goToContributeur() {
    this.router.navigate(['contributeur']);
  }
  goToInvite() {
    this.router.navigate(['invite']);
  }

}
