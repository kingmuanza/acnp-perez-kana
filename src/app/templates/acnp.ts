import { Section } from '../models/section.model';
import { Paragraphe } from '../models/paragraphe.model';

// tslint:disable-next-line:max-line-length
const texte = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non pharetra ex. Quisque blandit dui et erat commodo, vel mattis quam placerat. Vestibulum dictum faucibus fermentum. Proin porttitor, nibh vitae congue rutrum, elit neque iaculis turpis, non facilisis nisl leo vel mi. Donec placerat sollicitudin enim ac viverra.';

const section1 = new Section('RESUME EXECUTIF');
section1.contenu.push(new Paragraphe(texte));

const section2 = new Section('CHAPITRE 0 : INTRODUCTION');
section2.contenu.push(new Paragraphe(texte));

const section3 = new Section('CHAPITRE I : MATERIEL ET METHODE');
section3.contenu.push(new Paragraphe(texte));
section3.contenu.push(new Section('1.1. Présentation de l\’aire de distribution naturelle de Pericopsis elata au Cameroun'));
section3.contenu.push(new Section('1.2. Méthode de collectes des données'));

const section4 = new Section('CHAPITRE II : BIOLOGIE DE Pericopsis elata');
section4.contenu.push(new Paragraphe(texte));
section4.contenu.push(new Section('2.1. Distribution de Pericopsis elata en Afrique'));
section4.contenu.push(new Section('2.2. Taxonomie de Pericopsis elata'));
section4.contenu.push(new Section('2.3. Distribution de Pericopsis elata au Cameroun'));
section4.contenu.push(new Section('2.4. Description de Pericopsis elata'));
section4.contenu.push(new Section('2.5. Ecologie de Pericopsis elata '));

const section5 = new Section('CHAPITRE III : COMMERCE ET PRODUCTION DE Pericopsis elata');
section5.contenu.push(new Paragraphe(texte));
section5.contenu.push(new Section('3.1. Commerce de Pericopsis elata'));
section5.contenu.push(new Section('3.2. Volume de Pericopsis elata attribué par titre d’exploitation de 2005 à 2015'));
section5.contenu.push(new Section('3.3. Données de production et d’exportation de Pericopsis)elata de 2005 à 2015'));



const section6 = new Section('CHAPITRE IV : GESTION FORESTIERE');
section6.contenu.push(new Paragraphe(texte));
const section7 = new Section('CHAPITRE V : SUIVI ET CONTROLE DE L’EXPLOITATION FORESTIERE');
section7.contenu.push(new Paragraphe(texte));
const section8 = new Section('CHAPITRE VI : MODELE DE GESTION ET CALCUL DES QUOTAS ');
section8.contenu.push(new Paragraphe(texte));
// tslint:disable-next-line:max-line-length
const section9 = new Section('CHAPITRE VII : PROPOSITIONS RELATIVES AU COMMERCE NON PREJUDICIABLE : DÉTERMINATION DES QUOTAS POUR L\'ANNÉE 2019.');
section9.contenu.push(new Paragraphe(texte));
const sectionA = new Section('CONCLUSION ET RECOMMANDATIONS');
sectionA.contenu.push(new Paragraphe(texte));

export const ACNP = [
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8,
    section9,
    sectionA,
];
