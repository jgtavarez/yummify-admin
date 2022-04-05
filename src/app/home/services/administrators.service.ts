import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Admin, AdministratorResp, Pagination, AdministratorFilters } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('Authorization') || '';
  }

  getAdministrators(pagination: Pagination, filters: AdministratorFilters) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<AdministratorResp>(`${environment.API_BASE}/api/admin?limit=${pagination.limit}&offset=${pagination.offset}&name=${filters.name}&email=${filters.email}&role=${filters.role}`, { headers });
  }

  getAdminById(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get<Admin>(`${environment.API_BASE}/api/admin/${id}`, { headers });
  }

  postAdmin(formData: Admin) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.post<any>(`${environment.API_BASE}/api/admin`, formData, { headers });
  }

  deleteAdmin(id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.delete<any>(`${environment.API_BASE}/api/admin/${id}`, { headers });
  }

  updateAdmin(formData: Admin, id: number) {
    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.put<any>(`${environment.API_BASE}/api/admin/${id}`, formData, { headers });
  }

}
