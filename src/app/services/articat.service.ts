import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Categorie } from '../models/categorie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticatService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  addArticle(ArticleDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/articles`, ArticleDetails);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`);
  }

  addCategory(CategorieDetails: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/categories`, {
      CategorieDetails,
    });
  }

  getArticlesByUser(id: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles/written/${id}`);
  }
}
