import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Response } from '../models/response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('userToken');
  }

  register(params: object): Observable<Response> {
    return this.http.post<any>(`${environment.api}/register`, params)
      .pipe(map(response => {
        if ('email' in response) {
          return {error: false, message: ''};
        }
        else {
          return {error: true, message: response};
        }
      })
    );
  }

  login(params: object): Observable<Response> {
    return this.http.post<any>(`${environment.api}/login`, params)
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

  logout(): Observable<Response> {
    const headers = new HttpHeaders({Authorization: `Token ${this.token}`});

    return this.http.post<any>(`${environment.api}/logout`, {}, {headers})
      .pipe(map(response => {
          this.token = null;
          localStorage.removeItem('userToken');

          return {error: false, message: ''};
        })
      );
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
