import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { of, Observable } from 'rxjs';
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
  uid: number;
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
    this.uid = 0;
  }
  
  loginStatus(): Observable<boolean> {
    this.tokenService.getToken().subscribe(res => {
      this.currentJWT = res.token;
      this.expiry = res.expiry;
      this.user = res.user;
      this.uid = res.uid;
    });

    const currentTime = Math.floor((Number(new Date())/1000));
      if (this.currentJWT != 'no Token') {
        if(this.expiry > currentTime) {
          this.userIsLoggedIn = true;
        } else {
          this.userIsLoggedIn = false;
          this.logOut();
        }
      } else {
        this.userIsLoggedIn = false;
      }
    return of(this.userIsLoggedIn);
  };

  authUser(username: string, password: string): Observable<ArrayBuffer>{
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/authenticate`;
      return this.http.post< any >(this.url, {username: username, password: password});
    }

 
  logOut() {
    this.tokenService.deleteToken();
    //logs user out, removes localstorage token, updates logged in status
  }

}