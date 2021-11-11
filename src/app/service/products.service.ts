import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  itemDescription: object;

  constructor(private http: HttpClient) {
    this.itemDescription = {};
   }
   
  getProducts():  Observable<Product[]> {
    return this.http.get<Product[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/products`)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/products/${id}`);
  }

  // postProuct(product: Product){
  //   return this.http.post<Product>(`http)
  // }

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
