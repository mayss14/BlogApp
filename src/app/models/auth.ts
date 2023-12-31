export class User {
  id: number;
  username: string;
  password: string;
  nom: string;
  prenom: string;
  email: string;

  constructor(
    id: number,
    username: string,
    password: string,
    nom: string,
    prenom: string,
    email: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }
}

//getter for id
export function getId(user: User): number {
  return user.id;
}
