import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { OrdersService } from './orders.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
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

  productId = 0;
  orderId = 0;
  url = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private orderService: OrdersService
  ) {}

  addAuthorisation(): void {
    this.currentToken(); // invoke method to update token before submission to API
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.jwtToken.token);
  }

  currentToken(): void {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    });
  }

  currentActiveOrder(): void {
    this.orderService.activeOrder().subscribe(res => {
      return this.orderId = res.id;
    });
  }


}
