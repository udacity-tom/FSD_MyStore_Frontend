import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;
  username: string;
  password: string;
  currentJWT: string;
  url: string = '';
  returnedJWT: string = '';
  tokenPromise: string = '';
  returnedRes: {
  newUser: object,
  newtoken: string,
  payload: object } = {
    newUser: {},
    newtoken: '',
    payload: {}
  };
  userIsLoggedIn: boolean = false;
  user: string = '';
  expiry: number = 0;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { 
    this.username = '';
    this.password = '';
    this.currentJWT = '';
  }
  
  loginStatus(): Observable<boolean> {
    this.tokenService.getToken().subscribe(res => {
      this.currentJWT = res.token;
      this.expiry = res.expiry;
      this.user = res.user;
    });
    console.log('login service', this.currentJWT, this.expiry, this.user);
    const currentTime = Math.floor((Number(new Date())/1000));
      if (this.currentJWT != 'no Token') {
        if(this.expiry > currentTime) {
          this.userIsLoggedIn = true;
        } else {
          this.logOut();
        }
        // console.log('userIsLoggedIn value, ', this.userIsLoggedIn);  
      } else {
        this.userIsLoggedIn = false;
        // console.log('userIsLoggedIn value', this.userIsLoggedIn);
      }
    return of(this.userIsLoggedIn);
  };

  authUser(username: string, password: string): Observable<ArrayBuffer>{
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/authenticate`;
      return this.http.post< any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'});
    }

 
  logOut() {
    this.tokenService.deleteToken();
  //   //logs user out, essentially deleting localstorage token, but updates logged in status
  }
  
  registerNewUser(username: string, firstname: string, lastname: string, password: string): Observable<object> {
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/create`;
    console.log('login service user register', {username: username, firstname: firstname, lastname:lastname, password: password});
    return this.http.post<{newUser:object, newToken: string, payload: object}> (this.url, {username: username, firstname: firstname, lastname:lastname, password: password}, );
  }
}