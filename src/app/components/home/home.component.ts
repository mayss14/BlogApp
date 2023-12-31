import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Categorie } from 'src/app/models/categorie';
import { ArticatService } from 'src/app/services/articat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];

  constructor(private router: Router, private artiser: ArticatService) {}

  loadArticles() {
    this.artiser.getArticles().subscribe((response) => {
      if (response) {
        this.articles = response;
      } else {
        console.log('error');
      }
    });
  }

  showDetails(ID: number | any) {
    this.router.navigateByUrl('/article', { state: { id: ID } });
  }

  ngOnInit(): void {
    this.loadArticles();
  }
}
