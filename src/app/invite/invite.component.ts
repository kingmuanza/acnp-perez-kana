import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor(private router: Router, private userService: UtilisateurService) { }

  ngOnInit() {
  }


  deconnexion() {
    const oui = confirm('Êtes-vous sûr de vouloir quitter l\'application ?');
    if (oui) {
      this.userService.deconnexion();
      this.router.navigate(['connexion']);
    }
  }

}
