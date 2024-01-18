import { User } from './auth';
import { Categorie } from './categorie';

export class Article {
  id: number | null;
  titre: string;
  contenu: string;
  claps: number;
  categorie: Categorie;
  auteur: any;

  constructor(
    id: number | null,
    titre: string,
    contenu: string,
    claps: number,
    categorie: Categorie,
    auteur: any
  ) {
    this.id = id;
    this.titre = titre;
    this.contenu = contenu;
    this.claps = claps;
    this.categorie = categorie;
    this.auteur = auteur;
  }
}
