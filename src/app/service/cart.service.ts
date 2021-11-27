import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { TokenService } from './token.service';
import { OrdersService } from './orders.service';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  jwtToken: {token: string, expiry: number, user: string, uid: number} = {token: '', expiry: 0, user: '', uid: 0};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  }

  productId: number = 0;
  orderId: number = 0;

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private orderService: OrdersService
  ) { }


  addProductToActiveOrder(pid: number, quantity: number): Observable<object> {
      this.productId = pid;
      this.orderService.currentActiveOrder().subscribe(res => {
        this.orderId = res;
      })
      const body = {
        "id": pid,
        "quantity": quantity
    }
      console.log('cart.service pid, quantity', pid, quantity, this.orderId)
      this.addAuthorisation();
      console.log('post addProduct url',`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+this.orderId, body, this.httpOptions);
    const request = this.http.post<Product>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+this.orderId, body, this.httpOptions)
      
      return request
    }

  addProductService(): Observable<number> {
    return of(this.productId);
  }
  addAuthorisation(): void {
    this.currentToken(); //invoke method to update token before submission to API
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.jwtToken.token);
  }

  currentToken(): void {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    })
  }



}

