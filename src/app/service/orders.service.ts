import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { TokenService } from './token.service';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  }
  jwtToken: {token: string, expiry: number, user: string, uid: number} = {token: '', expiry: 0, user: '', uid: 0};


  constructor(private http: HttpClient, private tokenService: TokenService, private interceptRequest: InterceptorService) { }
  
  getOrders(): Observable<Order[]> {  //gets the results of orders DB
    console.log('order service, token value', this.jwtToken);
    // let currentToken: object = from(this.tokenService.getToken());
    this.currentToken();
    // console.log('order service currentToken', jwtToken);
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.jwtToken);
    // console.log('headers', this.httpOptions);
    // console.log('requested route on orders', `${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders');
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+this.jwtToken.token);
    console.log('headers', this.httpOptions);
    let request = this.http.get<Order[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid+'/orders', this.httpOptions);
    // return this.interceptRequest(request);
    return request;
  }

  currentToken(): void {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    })
    // return this.jwtToken;
  }
  currentUserId(): void {
    // this.
  }
}

