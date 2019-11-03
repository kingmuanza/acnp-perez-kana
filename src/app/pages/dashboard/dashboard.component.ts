import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  documents = [1, 2, 3, 4, 5, 5, 6, 7];
  utilisateur: Utilisateur;
  utilisateurSubscription = new Subscription();

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
    this.utilisateurSubscription = this.userService.utilisateurSubject.subscribe((utilisateur: Utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.userService.emit();
  }

  inscription() {
    this.router.navigate(['inscription']);
  }
  document() {
    this.router.navigate(['manage-document']);
  }

}
