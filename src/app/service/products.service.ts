import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiServer: string;
  apiPort: string;
  itemDescription: object;

  constructor(private http: HttpClient) {
    this.apiServer = '127.0.0.1';
    this.apiPort = '3002';
    this.itemDescription = {};
   }

  getProducts():  Observable<Product[]> {
    return this.http.get<Product[]>(`http://${this.apiServer}:${this.apiPort}/products`)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`http://${this.apiServer}:${this.apiPort}/products/${id}`);
  }

  getDescription(link: string, itemName: string): Observable<object> {
    return this.itemDescription = from(
      fetch(`${link}${itemName}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'no-cors'
      }
      )
    );
  }
}
