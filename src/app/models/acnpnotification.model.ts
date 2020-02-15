import { Utilisateur } from './utilisateur.model';
import { Section } from './section.model';

export class ACNPNotification {

    id: string;
    date: Date;
    section: Section;
    utilisateur: Utilisateur;
    idutilisateurs: Array<string>;
    message: string;
    type: string;
    iddocument: string;
    nomdocument: string;

    constructor() {
        this.id = this.setId();
        this.idutilisateurs = [];
    }

    pad2(n) {
        return n < 10 ? '0' + n : n;
    }

    setId() {
        const date = new Date();
        // tslint:disable-next-line:max-line-length
        return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours() + 1 ).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2) + ('' + date.getMilliseconds());
    }

}
