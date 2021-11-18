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
  

// function logstatus(observer: Ob)

  // logStatus = new Observable<boolean>(logStatus => {
  // logStatus = new Observable<boolean>(currentStatus => {
    // let userIsLoggedIn = false;
loginStatus(): Observable<boolean> {
    const userHasJwt = this.tokenService.getToken();
    const jwtValidity = Number(this.tokenService.getCurrentExpiry());
    const currentTime = Math.floor((Number(new Date())/1000));
    const currentUser = userHasJwt.user;
    console.log('userHasJwt',userHasJwt);
    console.log('userHasJwt.user->currentUser',currentUser);
    console.log('jwtValidity',jwtValidity);
    // console.log('currentTime', Number(new Date())/1000, currentTime);
      if (userHasJwt) {
        console.log('userHasJwt',userHasJwt);
        if(jwtValidity > currentTime) {
          console.log('jwtValidity',jwtValidity);
          console.log('currentTime',currentTime);
          this.userIsLoggedIn = true;
        }
        console.log('userIsLoggedIn value', this.userIsLoggedIn);  
      } else {
        this.userIsLoggedIn = false;
        console.log('userIsLoggedIn value', this.userIsLoggedIn);
      }
    return of(this.userIsLoggedIn);
  };



  authUser(username: string, password: string): Observable<ArrayBuffer>{
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/authenticate`;
      return this.http.post< any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'});
    }

 
  logOut() {
    //logs user out, essentially deleting localstorage token, but updates logged in status
  }
  
  registerNewUser(username: string, firstname: string, lastname: string, password: string): Observable<object> {
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/create`;
    console.log('login service user register', {username: username, firstname: firstname, lastname:lastname, password: password});
    return this.http.post<{newUser:object, newToken: string, payload: object}> (this.url, {username: username, firstname: firstname, lastname:lastname, password: password}, );
  }
    // isLoggedIn():Observable<string> {
    
  //   return 
  // }

  



  }

