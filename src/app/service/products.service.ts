import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  itemDescription: object;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.itemDescription = {};
   }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/products/${id}`);
  }

  addProduct(newProduct: Product): Observable<Product> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/products/create`, {newProduct});
  }
}
