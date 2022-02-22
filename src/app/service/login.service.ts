import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL: string = environment.PROTOCOL + environment.API_SERVER_IP + ':' + environment.API_PORT;
  username: string;
  password: string;
  currentJWT: string;
  url = '';
  uid: number;
  userIsLoggedIn = false;
  user = '';
  expiry = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router, private toastService: ToastService) {
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
    const currentTime = Math.floor((Number(new Date()) / 1000));
    if (this.currentJWT !== 'no Token') {
        if (this.expiry > currentTime) { // add additional checking?
          this.userIsLoggedIn = true;
        } else {
          this.userIsLoggedIn = false;
          this.logOut('');
        }
      } else {
        this.userIsLoggedIn = false;
      }
    return of(this.userIsLoggedIn);
  }

  authUser(username: string, password: string): Observable< {token: string, expiry: number, uid: number, user: string}>{
    this.url = `${this.baseURL}/users/authenticate`;
    return this.http.post< any >(this.url, {'username': username, 'password': password});
    }

  logOut(name: string): void {
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
    if (name !== ''){
      this.toastService.show(`Logout ${name}`, `${name} successfully logged out!`);
    }
  }
}
