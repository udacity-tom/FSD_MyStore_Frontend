import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { Order_products } from '../models/Order_products';
import { TokenService } from './token.service';
import { InterceptorService } from './interceptor.service';
// import { request } from 'http';

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
  justOne: Order[] = [];  


  constructor(private http: HttpClient, private tokenService: TokenService, private interceptRequest: InterceptorService) { }
  
  getOrders(): Observable<Order[]> {  //gets the results of orders DB
    this.addAuthorisation();
    const request = this.http.get<Order[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders', this.httpOptions);
    return request;
  }
  
  createOrder(user_id?: string, status?: string): Observable<Order> {
    this.addAuthorisation();
    console.log('createOrder()', `${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/create');
    const request = this.http.post<Order>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/create', {user_id: user_id, status: status}, this.httpOptions);
    return request;
  }
  
  orderDetails(oid: number): Observable<Order_products[]> {
    this.addAuthorisation();
    const request = this.http.get<Order_products[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+oid, this.httpOptions);
    return request;
  }

  removeCartItem(quantity: number, oid: number, productId: number, opid: number): Observable<{id: number ,quantity: number, orderId: number, productId: number, order_productId: number}>{
    this.addAuthorisation();
    // console.log((`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+oid+'/delete-product/'+opid, this.httpOptions));
    const body = {
      "id": productId,
      "quantity": quantity
  }
    const request = this.http.post<{id: number ,quantity: number, orderId: number, productId: number, order_productId: number}> (`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders/'+oid+'/delete-product/'+opid, body, this.httpOptions)
    return request;
  }

  currentActiveOrder(): Observable<number> {
    this.getOrders().subscribe(res => {
      this.allOrders = res;
      console.log('orders.service.ts res in currentactivOrder', res);
      // this.activeOrderNum = this.activeOrder(res);

      this.activeOrder( res ).subscribe(res => {
        console.log('orders.service.ts currentActiveOrder res.id', res);
        this.activeOrderNum = res.id;
      })
    });

    return of(this.activeOrderNum);
  }
  activeOrder(allOrders: Order[]): Observable<any> {
    // console
    this.justOne = allOrders.filter(order => {
        if(order.status == 'active') {
          return order
        } else {
          return
        }
      })

    if(this.checkOrderLength(this.justOne)) {
      console.log('orders service justone is == 0');
      // this.createOrder();
  }

    console.log('orders.service.ts justOne', this.justOne);
    return of(this.justOne[0]);
  }


  checkOrderLength(orderArrayLength: Order[]): Observable<boolean> {
    const isTrue: boolean = orderArrayLength.length == 0;
    return of(isTrue)

  }

  productsInOrder(oid: number) {
    
  }

  addAuthorisation(): void {
    this.currentToken(); //invoke method to update token before submission to API
    console.log('order service, add authorisation current token', this.currentToken());
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.jwtToken.token);
    console.log('order service, add authorisation current token -headers', this.httpOptions);
  }

  currentToken(): void {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    })
  }
}

