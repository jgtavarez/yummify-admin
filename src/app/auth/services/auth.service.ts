import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces';
import { AppState } from '../../app.reducer';
import * as auth from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

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
          this.store.dispatch(auth.setUser({ admin: resp.authenticated }));
          localStorage.setItem('Authorization', resp.token)
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.store.dispatch(auth.removeUser());
    this.router.navigateByUrl('/auth/login');
  }
}
