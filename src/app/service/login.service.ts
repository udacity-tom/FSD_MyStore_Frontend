import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { shareReplay } from 'rxjs/operators'
// import { Auth } from '../models/Auth';
// import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiServer: string = '127.0.0.1';
  apiPort: string = '3002';
  username: string;
  password: string;
  currentJWT: string;
  url: string = '';
  returnedJWT: string = '';
  tokenPromise: string = '';
  // req: string = {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  }

  constructor(private http: HttpClient) { 
    this.username = '';
    this.password = '';
    this.currentJWT = '';
  }

  authUser(username: string, password: string): Observable<ArrayBuffer>{
    this.url = `http://${this.apiServer}:${this.apiPort}/users/authenticate`
   
      // console.log('the thing', this.http.post<any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'}));
      return this.http.post<any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'});
    }
  }
  // console.log("Observable login service response", String(this.http.post<Auth>(`http://${this.apiServer}:${this.apiPort}/users/authenticate`, {username, password}).shareReplay());

