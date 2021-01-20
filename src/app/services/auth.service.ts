import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Response } from '../models/response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string | null;
  private url = environment.backend_url;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken');
  }

  register(email: string, password: string): void {
    this.http.post(`${this.url}/register`, {email, password})
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string): Observable<Response> {
    return this.http.post<any>(`${this.url}/login`, {email, password})
      .pipe(map(response => {
          if ('token' in response) {
            this.token = response.token;
            localStorage.setItem('userToken', this.token as string);

            return {error: false, message: ''};
          }
          else {
            return {error: true, message: response.error};
          }
        })
      );
  }

  logout(): void {
    this.http.post(`${this.url}/logout`, {})
      .subscribe(response => {
        localStorage.removeItem('userToken');
        this.token = null;
      });
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
