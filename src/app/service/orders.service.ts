import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { Order_products } from '../models/Order_products';
import { TokenService } from './token.service';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

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

  constructor(private http: HttpClient, private tokenService: TokenService, private interceptRequest: InterceptorService) { }
  
  getOrders(): Observable<Order[]> {  //gets the results of orders DB
    this.addAuthorisation();
    const request = this.http.get<Order[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders', this.httpOptions);
    return request;
  }
  
  orderDetails(oid: number): Observable<Order_products[]> {
    this.addAuthorisation();
    const request = this.http.get<Order_products[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+oid, this.httpOptions);
    return request;
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

