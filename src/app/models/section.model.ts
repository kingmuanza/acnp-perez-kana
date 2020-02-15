import { Utilisateur } from './utilisateur.model';
import { Paragraphe } from './paragraphe.model';
import { Image } from './image.model';
import { Livre } from './livre.model';
import { Commentaire } from './commentaire.model';
import { Validation } from './validation.model';

export class Section {

    id: string;
    titre: string;
    utilisateur: Utilisateur;
    derniereModification: Date;
    contenu: Array<Section | Paragraphe | Image>;
    valide?: boolean;
    termine?: boolean;
    validation?: Validation;
    livres?: Array<Livre>;
    commentaires?: Array<Commentaire>;
    introduction?: boolean;
    newCreee: boolean;

    constructor(titre?: string) {
        this.id = 'section' + new Date().toISOString() + '@' + Math.random() * 1000000;
        this.titre = 'Titre';
        if (titre) {
            this.titre = titre;
        }
        this.derniereModification = new Date();
        this.contenu = new Array<Section | Paragraphe | Image>();
        this.valide = false;
    }


}
