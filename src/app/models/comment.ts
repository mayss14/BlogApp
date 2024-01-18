export class Comment {
  id: number | null;
  contenu: string;
  idUser: number;
  idArticle: number;

  constructor(id: number, contenu: string, idUser: number, idArticle: number) {
    this.id = id;
    this.contenu = contenu;
    this.idUser = idUser;
    this.idArticle = idArticle;
  }
}
