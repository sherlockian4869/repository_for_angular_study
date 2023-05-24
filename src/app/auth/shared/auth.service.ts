import { Injectable } from '@angular/core';
import { products } from 'src/app/products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData);
  }
  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/signup', userData);
  }
}
