import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Menu, MenuResp, Pagination, MenuFilters } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('Authorization') || '';
  }

  getMenu(pagination: Pagination, filters: MenuFilters) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<MenuResp>(`${environment.API_BASE}/api/menu?limit=${pagination.limit}&offset=${pagination.offset}&name=${filters.name}&description=${filters.description}&type=${filters.type}`, { headers });
  }

  getFoodById(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<Menu>(`${environment.API_BASE}/api/menu/${id}`, { headers });
  }

  postFood(formData: Menu) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.post<any>(`${environment.API_BASE}/api/menu`, formData, { headers });
  }

  deleteFood(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.delete<any>(`${environment.API_BASE}/api/menu/${id}`, { headers });
  }

  updateMenu(formData: Menu, id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.put<any>(`${environment.API_BASE}/api/menu/${id}`, formData, { headers });
  }

}
