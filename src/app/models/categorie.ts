export class Categorie {
  id: number;
  description: string;
  nom: string;

  constructor(id: number, description: string, nom: string) {
    this.id = id;
    this.description = description;
    this.nom = nom;
  }
}
