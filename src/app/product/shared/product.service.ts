import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get('/api/v1/products/');
  }
  getProductById(productId: string): Observable<any> {
    return this.http.get('/api/v1/products/' + productId);
  }
}
