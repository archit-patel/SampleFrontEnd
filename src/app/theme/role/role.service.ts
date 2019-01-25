import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from './role';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  addRole(role: Role): Observable<any> {
    return this.http.post<Role>(ApiUrls.BASE_URL + "role/add", role);
  }

  editRole(role: Role): Observable<any> {
    return this.http.post<Role>(ApiUrls.BASE_URL + "role/update", role);
  }

  deleteRole(id): Observable<any> {
    let body = new FormData();
    body.append("id", id);
    return this.http.post(ApiUrls.BASE_URL + "role/delete", body);
  }

  getAllPrivileges(): Observable<any> {
    return this.http.post(ApiUrls.BASE_URL + "privileges", new FormData());
  }

  addPrivilegeToRole(body): Observable<any> {
    return this.http.post(ApiUrls.BASE_URL + "privileges/add", body);
  }

  removePrivilegeFromRole(body): Observable<any> {
    return this.http.post(ApiUrls.BASE_URL + "privileges/remove", body);
  }

  getRoleById(id): Observable<any> {
    let body = new FormData();
    body.append("roleId", id);
    return this.http.post(ApiUrls.BASE_URL + "privileges/role", body);
  }
}
