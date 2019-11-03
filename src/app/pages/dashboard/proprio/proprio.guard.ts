import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Injectable()
export class PropioGuard implements CanActivate {

    constructor(private router: Router, private utilisateurService: UtilisateurService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('PropioGuard');
        console.log('canActivate');
        console.log(this.utilisateurService.utilisateur.id);
        if (this.utilisateurService.utilisateur.id && this.utilisateurService.utilisateur.qualite === 'Administrateur') {
            return true;
        } else {
            this.router.navigate(['/connexion']);
        }

    }
}
