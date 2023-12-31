import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users/auth/register`, userDetails);
  }

  getUserByUname(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/auth/user/${username}`);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/users/auth/login`, {
      username,
      password,
    });
  }
}
