import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

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
  // uid: number;
  firstname: string = '';
  lastname: string = '';
  houseNumber: string = '';
  streetAddress: string = '';
  streetAddress2: string = '';
  city: string = '';
  postcode: string = '';
  country: string = '';
  loading: boolean = false;
  loginStatus: boolean = false;
  jwtToken: {token: string, expiry: number, user: string, uid: number} = {token: '', expiry: 0, user: '', uid: 0};

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.username = '';
    this.password = '';
    this.url = '';
    

   }


  registerNewUser(username: string, firstname: string, lastname: string, password: string): Observable<object> {
    this.url = `${this.protocol}${this.apiServer}:${this.apiPort}/users/create`;
    // console.log('login service user register', {username: username, firstname: firstname, lastname:lastname, password: password});
    return this.http.post<{newUser:object, newToken: string, payload: object}> (this.url, {username: username, firstname: firstname, lastname:lastname, password: password}, );
  }

  updateUserDetails(
    firstname: string,
    lastname: string,
    houseNumber: string,
    streetAddress: string,
    streetAddress2: string,
    city: string,
    postcode: string,
    country: string

  ): Observable<object> {
    this.getUserId();
    this.url = `${this.protocol,this.apiServer}:${this.apiPort}/users/`${this.jwtToken.uid}
  }

  getUserId(): number {
    this.tokenService.getToken().subscribe(res => {
      this.jwtToken = res;
    })
  }

}
