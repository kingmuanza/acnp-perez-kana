export class Livre {
    id;
    titre;
    auteur;

    constructor() {
        this.id = 'livre' + new Date().toISOString() + '@#%' + Math.random() * 1000000;

    }
}
