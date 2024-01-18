import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentserviceService {
  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) {}

  addComment(CommentDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, CommentDetails);
  }

  getCommentsByArticle(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/articles/${id}`);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${id}`);
  }

  updateComment(CommentDetails: any): Observable<any> {
    return this.http.put<Comment>(`${this.baseUrl}/comments`, CommentDetails);
  }
}
