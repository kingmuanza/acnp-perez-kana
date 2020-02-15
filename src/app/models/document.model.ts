import { Utilisateur } from './utilisateur.model';
import { Section } from './section.model';
import { Espece } from './espece.model';
import { ACNPNotification } from './acnpnotification.model';

export class ACNPDocument {

    id: string;
    titre: string;
    description: string;
    date: Date;
    proprietaire: Utilisateur;
    sections: Array<Section>;
    idcontributeurs?: Array<string>;
    espece?: Espece;
    notifications?: Array<ACNPNotification>;

    constructor(titre?: string) {
        if (titre) {
            this.titre = titre;
        }
        this.id = 'document' + new Date().toISOString() + '@#%' + Math.random() * 1000000;
        this.date = new Date();
    }

}
