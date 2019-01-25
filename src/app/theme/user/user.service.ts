import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from '../../constants';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.post(ApiUrls.BASE_URL + "roles/all", new FormData());
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(ApiUrls.BASE_URL + "registration", user);
  }

  editUser(user: User): Observable<any> {
    return this.http.post<User>(ApiUrls.BASE_URL + "user/update", user);
  }

  deleteUser(id): Observable<any> {
    let body = new FormData();
    body.append("id", id);
    return this.http.post(ApiUrls.BASE_URL + "user/delete", body);
  }

  getUserById(id): Observable<any> {
    let body = new FormData();
    body.append("id", id);
    return this.http.post(ApiUrls.BASE_URL + "user/id", body);
  }
}
