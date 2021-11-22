import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, BehaviorSubject } from 'rxjs';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { InterceptorService } from './interceptor.service';
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
      'Authorization': 'Bearer '
    })
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.itemDescription = {};
   }
   userState = new BehaviorSubject(false);
   
  getProducts():  Observable<Product[]> {
    return this.http.get<Product[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/products`)
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/products/${id}`);
  }

  postNewProduct(newProduct: Product): Observable<Product> {
    //checked signed in & check current user
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.tokenService.getToken());
    console.log('headers', this.httpOptions);
    return this.http.post<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/products/create`, {newProduct: newProduct});
  }
  // , {observe: 'body', responseType: 'json' }

  // getSomething(route: string, route2?: string, id?: number): Observable<Product> {
  //   return this.http.get
  // }






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
