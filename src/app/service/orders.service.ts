import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  currentOrder: Order = {id: 0, user_id: 0, status: ''}; //The DB order where status ='active'
  allOrders: Order[] = []; //all user orders on DB
  activeOrderNum: number = 0;


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
  
  currentActiveOrder(): Observable<number> {
    this.getOrders().subscribe(res => {
      this.allOrders = res;
      this.activeOrderNum = this.activeOrder(res);
    });
    // const justOne  = this.allOrders.filter(order => {
    //   console.log('orders.service.ts justOne', justOne);
    //   return order.status == 'active';
    // })
    // return of(justOne[0].id);
    return of(this.activeOrderNum);
  }
  activeOrder(allOrders: Order[]): number {
    const justOne  = this.allOrders.filter(order => {
      return order.status == 'active';
    })
    // console.log('orders.service.ts justOne', justOne);
    return justOne[0].id;
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

