import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { User } from 'src/app/models/auth';
import { ArticatService } from 'src/app/services/articat.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  articles: Article[] = [];
  articles_user: Article[] = [];

  constructor(
    private auth: AuthService,
    private artiser: ArticatService,
    private route: Router
  ) {}

  loadArticlesUser() {
    this.auth
      .getUserByUname(sessionStorage.getItem('username') as string)
      .subscribe((response) => {
        if (response) {
          console.log(response);
          this.artiser.getArticlesByUser(response.id).subscribe((response) => {
            if (response) {
              this.articles_user = response;
            } else {
              console.log('error');
            }
          });
          console.log(this.articles_user);
        } else {
          console.log('error');
        }
      });
  }

  showDetails(ID: number | any) {
    this.route.navigateByUrl('/article', { state: { id: ID } });
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') as string;

    this.loadArticlesUser();
  }
}
