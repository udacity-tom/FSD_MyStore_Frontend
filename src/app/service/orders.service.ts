import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../models/Order';
import { TokenService } from './token.service';

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


  constructor(private http: HttpClient, private tokenService: TokenService) { }
  




  getOrders(): Observable<Order[]> {
    console.log('order service, token value', this.tokenService.getToken());
    let currentToken: object = from(this.tokenService.getToken());
    this.httpOptions.headers = this.httpOptions.headers.set('Authorisation', 'Bearer '+currentToken);
    console.log('headers', this.httpOptions);
    return this.http.get<Order[]>(`${this.protocol}${this.apiServer}:${this.apiPort}/products`, this.httpOptions)
  }
}

