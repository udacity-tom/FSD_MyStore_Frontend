import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { OrderProducts } from '../models/OrderProducts';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseURL: string = environment.PROTOCOL + environment.API_SERVER_IP + ':' + environment.API_PORT;
  jwtToken: { token: string, expiry: number, user: string, uid: number } = { token: '', expiry: 0, user: '', uid: 0 };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };
  currentOrder: Order = {
    id: 0,
    userId: 0,
    status: ''
  }; // The DB order where status ='active'
  allOrders: Order[] = []; // all user orders on DB
  justOne: Order[] = [];
  orderProducts: OrderProducts[] = [{id: 0, productid: 0, quantity: 0, orderid: 0}]; // order transactions
  productId = 0;
  orderId = 0;
  url = '';
  cartItems: Subject<number> = new BehaviorSubject<number>(0);


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) {}

  setCartItems(numberOfCartItems: number): void {
    this.cartItems.next(numberOfCartItems);
    console.log('order service cart items', numberOfCartItems);
    console.log('order service cart items', this.cartItems);
  }

  getOrders(): Observable < Order[] > { // gets the results of orders DB
    this.addAuthorisation();
    if (this.jwtToken.uid === 0) { // gets round error of calling API for orders when not logged in
      return of([{
        id: 0,
        userId: 0,
        status: 'active'
      }]); // if user not logged in return order zero
    }
    const request = this.http.get < Order[] > (`${this.baseURL}/users/` +
      this.jwtToken.uid + '/orders', this.httpOptions);
    return request;
  }

  createOrder(userId ?: string, status ?: string): Observable < Order > {
    this.addAuthorisation();
    const request = this.http.post < Order > (`${this.baseURL}/users/` +
      this.jwtToken.uid + '/orders/create', {
        userId,
        status
      }, this.httpOptions);
    return request;
  }

  completeOrder(oid: number): Observable < Order > {
    this.addAuthorisation();
    const body = {}; // required for http put request (modification) RFC7231
    const request = this.http.put < Order > (`${this.baseURL}/users/` +
      this.jwtToken.uid + '/orders/' + oid, body, this.httpOptions);
    return request;
  }

  orderDetails(oid: number): Observable < OrderProducts[] > {
    this.addAuthorisation();
    const request = this.http.get < OrderProducts[] > (`${this.baseURL}/users/` +
      this.jwtToken.uid + '/orders/' + oid, this.httpOptions);
    return request;
  }

  addProductToActiveOrder(pid: number, quantity: number, oid: number): Observable < object > {
    this.productId = pid;
    this.activeOrder();
    const body = {
      id: pid,
      quantity
    };
    this.addAuthorisation();
    this.url = `${this.baseURL}/users/${this.jwtToken.uid}/orders/${oid}/add-product`;
    return this.http.post < Product > (this.url, body, this.httpOptions);
  }

  removeCartItem(quantity: number, oid: number, productid: number, opid: number): Observable < {
    id: number,
    quantity: number,
    orderId: number,
    productid: number,
    order_productId: number
  } > {
    this.addAuthorisation();
    const body = {
      id: productid,
      quantity
    };
    const request = this.http.post < {
      id: number,
      quantity: number,
      orderId: number,
      productid: number,
      order_productId: number
    } > (`${this.baseURL}/users/` + this.jwtToken.uid + '/orders/' + oid +
      '/delete-product/' + opid, body, this.httpOptions);
    return request;
  }

  activeOrder(): Observable < Order > {
    this.addAuthorisation();
    if (this.jwtToken.uid === 0) { // gets round error of calling API for orders when not logged in
      return of({
        id: 0,
        userId: 0,
        status: 'active'
      }); // if user not logged in return order zero
    }
    const request = this.http.get < Order > (`${this.baseURL}/users/` + this.jwtToken.uid + '/activeorder', this.httpOptions);
    if ( request === undefined ) {
      this.createOrder();
      this.activeOrder();
    }
    return request;
  }

  addAuthorisation(): void {
    this.currentToken(); // invoke method to update token before submission to API
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.jwtToken.token);
  }

  currentToken(): void {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    });
  }
}
