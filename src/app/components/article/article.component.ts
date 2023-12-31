import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticatService } from 'src/app/services/articat.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  route: Router;
  title: any;
  body: any;
  username: string;
  id: number;
  articles: Article[] = [];

  constructor(@Inject(Router) route: Router, private artiser: ArticatService) {
    this.route = route;
    this.id = this.route.getCurrentNavigation()?.extras.state?.['id'];
    this.username = sessionStorage.getItem('username') as string;
  }

  ngOnInit(): void {
    console.log(this.id);
    this.artiser.getArticles().subscribe((response) => {
      if (response) {
        this.articles = response;
        this.articles.map((article) => {
          if (article.id === this.id) {
            this.title = article.titre;
            this.body = article.contenu;
          }
        });
      } else {
        console.log('error');
      }
    });
  }
}
