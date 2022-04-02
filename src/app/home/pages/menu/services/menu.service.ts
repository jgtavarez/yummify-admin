import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MenuResp, Pagination } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('Authorization') || '';
  }

  getMenu(pagination: Pagination) {
    const token = localStorage.getItem('Authorization') || '';
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<MenuResp>(`${environment.API_BASE}/api/menu?limit=${pagination.limit}&offset=${pagination.offset}`, { headers });
  }

}
