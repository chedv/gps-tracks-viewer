import { HttpClient } from '@angular/common/http';
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
    console.log(this.http);
    return this.http.post<any>(`${environment.api}/register`, params)
      .pipe(map(response => {
        return {error: false, message: response};
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

  logout(): void {
    this.http.post(`${environment.api}/logout`, {})
      .subscribe(response => {
        localStorage.removeItem('userToken');
        this.token = null;
      });
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }
}
