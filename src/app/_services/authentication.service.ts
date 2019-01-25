import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiUrls } from '../constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //body = new FormData();
  constructor(private http: HttpClient) { }

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  login(body, username: string) {

    return this.http.post<any>(ApiUrls.BASE_URL + 'login', body)
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token && res.user) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
          localStorage.setItem('userInfo', JSON.stringify({ user: res.user }));
          this.getLoggedInName.emit(localStorage.getItem('userInfo'));
        } else {
          this.getLoggedInName.emit("denied");
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.getLoggedInName.emit("denied");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userInfo');
  }
}
