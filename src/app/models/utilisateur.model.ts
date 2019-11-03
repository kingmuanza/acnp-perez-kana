export class Utilisateur {


    id: string;
    nomComplet: string;
    qualite: string;

    constructor(nom) {
        this.nomComplet = 'Nom d\'utilisateur';
        if (nom) {
            this.nomComplet = nom;
        }
    }

}
