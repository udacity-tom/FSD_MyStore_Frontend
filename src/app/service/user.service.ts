import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Order } from '../models/Order';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  username: string;
  password: string;
  url: string;
  // uid: number = 0;
  // firstname: string = '';
  // lastname: string = '';
  // houseNumber: string = '';
  // streetAddress: string = '';
  // streetAddress2: string = '';
  // city: string = '';
  // postcode: string = '';
  // country: string = '';
  loading: boolean = false;
  loginStatus: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  }
  jwtToken: {token: string, expiry: number, user: string, uid: number} = {token: '', expiry: 0, user: '', uid: 0};

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.username = '';
    this.password = '';
    this.url = '';
   }


  registerNewUser(username: string, firstname: string, lastname: string, password: string): Observable<object> {
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/create`;
    return this.http.post<{newUser:object, newToken: string, payload: object}> (this.url, {username: username, firstname: firstname, lastname:lastname, password: password}, );
  }

  updateUserDetails( user: User
  ): Observable<object> {
    this.addAuthorisation();
    // const body = {
    //   "firstname": firstname,
    //   "lastname": lastname,
    //   "housenum": houseNumber,
    //   "street1": streetAddress,
    //   "city": city,
    //   "postcode": postcode,
    //   "country": country
    // }
    const body = User;
    const request = this.http.put<{uid: number}> (`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid, body, this.httpOptions);
    const requestURL =  (`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid, body, this.httpOptions);
    return request;
  }

  getUserId(): number {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    })
    return this.jwtToken.uid;
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

  show(uid: number): Observable<User> {
    this.addAuthorisation();
    const request = this.http.get<User> (`${this.protocol}${this.apiServer}:${this.apiPort}/users/`+this.jwtToken.uid, this.httpOptions);
    return request;
  }

}
