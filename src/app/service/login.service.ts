import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

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

  authUser(username: string, password: string): Observable<ArrayBuffer>{
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/authenticate`;
      return this.http.post< any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'});
    }

  isLoggedIn() {
    //observable to check if use is logged in
    //checks, if valid token is present in local storage
    //checks if token is still valid
  }
  
  logOut() {
    //logs user out, essentially deleting localstorage token
  }
  //simple user registration
  registerNewUser(username: string, firstname: string, lastname: string, password: string): Observable<object> {
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/create`;
    console.log('login service user register', {username: username, firstname: firstname, lastname:lastname, password: password});
    return this.http.post<object> (this.url, {username: username, firstname: firstname, lastname:lastname, password: password}, {observe: 'body', responseType: 'json'});
  }
    // isLoggedIn():Observable<string> {
    
  //   return 
  // }

  



  }

