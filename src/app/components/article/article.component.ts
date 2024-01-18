import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticatService } from 'src/app/services/articat.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommentserviceService } from 'src/app/services/commentservice.service';
import { Comment } from 'src/app/models/comment';
import { Categorie } from 'src/app/models/categorie';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  route: Router;
  title: any;
  body: any;
  username: string = '';
  claps: number | any;
  id: number;
  articles: Article[] = [];
  comments: any[] = [];
  comment: string = '';
  com = new FormControl<string>('');
  user_id: number = 0;
  c: Comment = new Comment(0, '', 0, 0);
  article: Article = new Article(0, '', '', 1, new Categorie(0, '', ''), 0);
  visible1: boolean = false;
  visible2: boolean = false;

  updateCom: FormGroup;
  upcomment: string = '';

  constructor(
    @Inject(Router) route: Router,
    private artiser: ArticatService,
    private auth: AuthService,
    private commentser: CommentserviceService
  ) {
    this.route = route;
    this.id = this.route.getCurrentNavigation()?.extras.state?.['id'];
    this.auth = auth;
    this.commentser = commentser;
    this.updateCom = new FormGroup({
      com: this.com,
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.artiser.getArticles().subscribe((response) => {
      if (response) {
        this.articles = response;

        console.log(this.articles);
        this.articles.map((article) => {
          if (article.id === this.id) {
            this.title = article.titre;
            this.body = article.contenu;
            this.claps = article.claps;
            this.username = article.auteur.username;
          }
        });
        console.log(this.claps);
      } else {
        console.log('error');
      }
    });
    this.getCommentsByArticle(this.id);
  }

  updateComment(c: Comment) {
    this.visible1 = false;
    c.contenu = this.updateCom.get('com')?.value;
    c.idArticle = this.id;
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          this.user_id = response.id;
          if (c.idUser == response.id) {
            c.idUser = this.user_id;
            this.commentser.updateComment(c).subscribe((response) => {
              location.reload();
              if (response) {
              } else {
                console.log('error');
              }
            });
          }
        } else {
          this.visible1 = false;
        }
      });
  }

  getCommentsByArticle(id: number) {
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          this.user_id = response.id;
          this.commentser.getCommentsByArticle(id).subscribe((response) => {
            if (response) {
              this.comments = response;
              this.comments.map((c) => {
                if (c.auteur.id === this.user_id) {
                  this.visible2 = true;
                } else {
                  this.visible2 = false;
                }
              });

              console.log(this.comments);
            } else {
              console.log('error');
            }
          });
        }
      });
  }

  showDialog(c: any) {
    console.log(c.auteur.id);
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          this.user_id = response.id;
          if (c.auteur.id == response.id) {
            this.visible1 = true;
          } else {
            this.visible1 = false;
          }
        }
      });
  }
  addClaps() {
    this.artiser.getArticleById(this.id).subscribe((response) => {
      if (response) {
        response.claps = response.claps + 1;
        this.article.id = response.id;
        this.article.titre = response.titre;
        this.article.contenu = response.contenu;
        this.article.claps = response.claps;
        this.article.categorie = response.categorie;
        this.article.auteur = response.auteur.id;

        console.log(this.article);
        this.artiser
          .updateArticle(this.article as Article)
          .subscribe((response) => {
            if (response) {
              location.reload();
            } else {
              console.log('error');
            }
          });
      } else {
        console.log('error');
      }
    });
  }

  deleteComment(id: any) {
    if (this.visible2) {
      this.commentser.deleteComment(id).subscribe((response) => {
        location.reload();
        if (response) {
        } else {
          console.log('error');
        }
      });
    } else {
      console.log('error');
    }
  }

  onSubmit() {
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          this.user_id = response.id;
          this.c = new Comment(0, this.comment, this.user_id, this.id);
          this.commentser.addComment(this.c).subscribe((response) => {
            this.comment = '';
            location.reload();
            if (response) {
            } else {
              console.log('error');
            }
          });
        } else {
          console.log('error');
        }
      });
  }
}
