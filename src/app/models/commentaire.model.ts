export class Commentaire {
    id;
    utilisateur;
    discours;
    date;

    constructor() {
        this.id = 'commentaire' + new Date().toISOString() + '@' + Math.random() * 1000000;
        this.date = new Date().toISOString();
    }
}
