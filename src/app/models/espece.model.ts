export class Espece {
    id;
    nom;

    constructor(nom?: string) {
        if (nom) {
            this.nom = nom;
        }
        this.id = 'espece' + new Date().toISOString() + '@#%' + Math.random() * 1000000;

    }
}
