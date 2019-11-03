export class Paragraphe {

    id: string;
    texte: string;
    derniereModification: Date;

    constructor(texte?: string) {
        this.id = 'paragraphe' + new Date().toISOString() + '#' + Math.random() * 1000000;
        this.texte = 'Votre texte ici';
        if (texte) {
            this.texte = texte;
        }
        this.derniereModification = new Date();
    }

}
