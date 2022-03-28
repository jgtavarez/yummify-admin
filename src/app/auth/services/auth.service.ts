import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('Authorization') || '';
  }

  login(formData: Login) {
    return this.http.post(`${environment.API_BASE}/api/auth/admin/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('Authorization', resp.token)
        })
      )
  }

  validateJWT(): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.token
    })

    return this.http.get(`${environment.API_BASE}/api/auth/renew`, { headers })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('Authorization', resp.token)
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }
}
