import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Menu } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('Authorization') || '';
  }

  getMenu() {
    const token = localStorage.getItem('Authorization') || '';
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<Menu[]>(`${environment.API_BASE}/api/menu`, { headers });
  }

}
