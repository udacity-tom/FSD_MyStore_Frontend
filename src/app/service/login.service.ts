import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/authenticate`
      return this.http.post< any >(this.url, {username: username, password: password}, {observe: 'body', responseType: 'json'});
    }
  }

