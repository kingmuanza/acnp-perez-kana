import { Section } from '../models/section.model';
import { Paragraphe } from '../models/paragraphe.model';

// tslint:disable-next-line:max-line-length
const texte = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non pharetra ex. Quisque blandit dui et erat commodo, vel mattis quam placerat. Vestibulum dictum faucibus fermentum. Proin porttitor, nibh vitae congue rutrum, elit neque iaculis turpis, non facilisis nisl leo vel mi. Donec placerat sollicitudin enim ac viverra.';

const section1 = new Section('RESUME EXECUTIF');
// tslint:disable-next-line:max-line-length
const section1Texte1 = 'Le Cameroun compte quatre espèces d’arbres du genre Guibourtia (Fabaceae/Leguminosae-Detarioideae) à savoir: Guibourtia demeusei (Harms) J.Léonard, G. ehie (A.Chev.) J.Léonard G. pellegriniana J.Léonard et G. tessmannii (Harms) J.Léonard. Trois sont appelées de la dénomination de nom pilote ou commercial Bubinga. Elles sont distinguées au Cameroun sous les appelations communes suivantes : bubinga rouge (G. demeusei) et bubinga rose (G. pellegriniana et G. tessmannii). Des questions en rapport avec la surexploitation des ces trois espèces d’arbres ont été relevées ces 10 dernières années, des quantités importantes des produits à base de ces trois espèces ayant été exportées en Asie et en Europe.';
section1.contenu.push(new Paragraphe(section1Texte1));
// tslint:disable-next-line: max-line-length
const section1Texte2 = 'Parmi les décisions prises lors de la 17ème Conférence des parties (CoP 17) de la Convention sur le Commerce international d’espèces de faune et flore sauvages menacées d’extinction (CITES) organisée à Johanesbourg (Afrique du Sud) du 24 septembre au 05 octobre 2016, les trois espèces de Bubinga ont été inscrites à l’Annexe II . La proposition d’inscription a été faite avec les précisions suivantes:';
section1.contenu.push(new Paragraphe(section1Texte2));
// tslint:disable-next-line:max-line-length
const section1Texte3 = '•	Inscrire Guibourtia tessmannii dans l’annexe II de la CITES en application de l’article II (2)	(a) de la Convention et la résolution Conf. 9.24 (Rev. Cop16), Annexe II a, parapgraphe B; \n •	Inscrire  Guibourtia  pellegriniana  dans  l’annexe  II  de  la  CITES  en  application  de l’article II (2) (a) de la Convention et la résolution Conf. 9.24 (Rev. Cop16), Annexe II a, parapgraphe B; \n•	Inscrire Guibourtia demeusei dans l’annexe II de la CITES en application de l’article II (2)	(a) de la Convention et la résolution Conf. 9.24 (Rev. Cop16), Annexe II a, parapgraphe B.';
section1.contenu.push(new Paragraphe(section1Texte3));
// tslint:disable-next-line:max-line-length
const section1Texte4 = 'Avant d’emettre un permis d’exportation du commerce des specimens d’espèces inscrites dans l’annexe II (Article IV 2a), une des obligations est qu’“une autorité scientifique de l’Etat exportateur ait au préalable conseillé l’autorité de gestion qu’une telle exportation n’est pas préjudiciable à la survie de l’espèce indiquée”.';
section1.contenu.push(new Paragraphe(section1Texte4));
// tslint:disable-next-line:max-line-length
const section1Texte5 = 'Le présent document rapporte la situation actuelle des espèces de Bubinga au Cameroun sur les plans des données biologiques, aires d’occurrence et d’occupation, conservationn exploitation, controle qui sont parmi les éléments essentiels pour la formulation d’un Avis de Commerce Non Préjudiciable (ACNP). Les données ont été rassemblées à partir de la littérature constituée essentiellement des documents des plans d’aménagement des Unités forestières d’aménagement (UFAs) et des forêts communales (FCs), des plans de gestion des forêts communautaires (FoCs),';
section1.contenu.push(new Paragraphe(section1Texte5));

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
