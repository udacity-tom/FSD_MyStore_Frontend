import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  Order
} from '../models/Order';
import {
  OrderProducts
} from '../models/OrderProducts';
import {
  TokenService
} from './token.service';
import {
  InterceptorService
} from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // apiServer: string = environment.API_SERVER_IP;
  // apiPort: string = environment.API_PORT;
  // protocol: string = environment.PROTOCOL;
  baseURL: string = environment.PROTOCOL + environment.API_SERVER_IP + ':' + environment.API_PORT; 
  jwtToken: {
    token: string,
    expiry: number,
    user: string,
    uid: number
  } = {
    token: '',
    expiry: 0,
    user: '',
    uid: 0
  };
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
  activeOrderNum = 0;
  justOne: Order[] = [];


  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private interceptRequest: InterceptorService) {}

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

  removeCartItem(quantity: number, oid: number, productId: number, opid: number): Observable < {
    id: number,
    quantity: number,
    orderId: number,
    productId: number,
    order_productId: number
  } > {
    this.addAuthorisation();
    const body = {
      id: productId,
      quantity
    };
    const request = this.http.post < {
      id: number,
      quantity: number,
      orderId: number,
      productId: number,
      order_productId: number
    } > (`${this.baseURL}/users/` + this.jwtToken.uid + '/orders/' + oid +
      '/delete-product/' + opid, body, this.httpOptions);
    return request;
  }

  currentActiveOrder(): Observable < number > {
    this.getOrders().subscribe(res => {
      this.allOrders = res;
      this.activeOrder(res).subscribe(order => {
        if (order === undefined) {
          this.createOrder();
        }
        this.activeOrderNum = order.id;
      });
    });

    return of(this.activeOrderNum);
  }
  activeOrder(allOrders: Order[]): Observable < any > {
    this.justOne = allOrders.filter(order => {
      if (order.status === 'active') {
        return order;
      } else {
        return;
      }
    });
    if (this.checkOrderLength(this.justOne)) {}
    return of(this.justOne[0]);
  }


  checkOrderLength(orderArrayLength: Order[]): Observable < boolean > {
    const isTrue: boolean = orderArrayLength.length === 0;
    return of(isTrue);
  }

  // productsInOrder(oid: number): void {

  // }

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
