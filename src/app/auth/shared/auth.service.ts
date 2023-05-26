import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

class DecordedToken {
  userId: string = '';
  username: string = '';
  exp: number = 0;
}

@Injectable()
export class AuthService {
  private decordedToken;
  constructor(private http: HttpClient, private router: Router) {
    this.decordedToken =
      JSON.parse(localStorage.getItem('app-meta')) || new DecordedToken();
  }

  getToken() {
    return localStorage.getItem('app-auth');
  }

  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decordedToken.exp));
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData).pipe(
      map((token: string) => {
        this.decordedToken = jwt.decodeToken(token);
        localStorage.setItem('app-auth', token);
        localStorage.setItem('app-meta', JSON.stringify(this.decordedToken));
        return token;
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/signup', userData);
  }

  logout() {
    localStorage.removeItem('app-auth');
    localStorage.removeItem('app-meta');
    this.decordedToken = new DecordedToken();
    this.router.navigate(['/']);
  }
}
