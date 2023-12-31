import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ArticatService } from 'src/app/services/articat.service';
import { Categorie } from 'src/app/models/categorie';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.css'],
})
export class WritingPageComponent implements OnInit {
  writingForm: FormGroup;
  titre = new FormControl<string>('');
  contenu = new FormControl<string>('');
  categorie = new FormControl<Categorie | null>(null);
  article: Article;
  current_user!: number;

  list_cat!: Categorie[];

  constructor(
    private router: Router,
    private artiser: ArticatService,
    private auth: AuthService
  ) {
    this.writingForm = new FormGroup({
      titre: this.titre,
      contenu: this.contenu,
      categorie: this.categorie,
    });
    this.article = new Article(null, '', '', 0, new Categorie(0, '', ''), 5);
  }

  loadCategories() {
    this.artiser.getCategories().subscribe((response) => {
      if (response) {
        this.list_cat = response;
      } else {
        console.log('error');
      }
    });
  }

  getUser() {
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          this.current_user = response.id;
          console.log(this.current_user);
        } else {
          console.log('error');
        }
      });
  }
  ngOnInit(): void {
    this.loadCategories();
    this.getUser();
  }

  submitDetails() {
    this.artiser.getArticles().subscribe((response) => {
      if (response) {
        this.article.id = response.length + 1;
      } else {
        console.log('error');
      }
    });
    this.article.titre = this.writingForm.get('titre')?.value;
    this.article.contenu = this.writingForm.get('contenu')?.value;
    this.article.categorie = this.writingForm.get('categorie')?.value;
    this.article.auteur = this.current_user;
    this.article.claps = 6;

    console.log(this.article.contenu);
    this.artiser.addArticle(this.article).subscribe((response) => {
      this.router.navigateByUrl('/article', {
        state: {
          id: this.article.id,
        },
      });
    });

    /*
    this.router.navigateByUrl('/article', {
      state: {
        title: this.title.value,
        body: this.body.value,
      },
    });
    */
  }
}
