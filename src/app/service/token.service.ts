import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string = '';
  expiry: number = 0;
  user: string = '';
  uid: number = 0;
  tokenObj: object = {token: this.token, expiry: this.expiry, user: this.user, uid: this.uid};

  constructor() { }


  setToken(tokenToSet: object) {
   localStorage.currentToken = JSON.stringify(tokenToSet);

  }

  getToken(): Observable <{token: string, expiry: number, user: string, uid: number}> {
    if(localStorage.currentToken){
    let storedToken: {token: string, expiry: number, user: string, uid: number};
    storedToken = JSON.parse(localStorage.currentToken);
    console.log('Yes, there is a stored token', storedToken);
    // console.log('storedToken token service', storedToken);
    return of(storedToken);
    } else {
      return of({token: 'no Token', expiry: -1, user: '', uid: 0});
    }
  }

  deleteToken() {
    delete localStorage.currentToken;
  }

  checkToken() {
    //checkToken on server response and initiate a setToken()
    //The interceptor observable sends the jwt with every request.
    //the server validates the request based on the submitted jwt
    //When the server sees the token is older than 15mins, it sends a new jwt
    //the client intercepts the new token and saves it.
    //
    //this, below, is client side renewel
    //get current expiry, check current time, then when expiry is 25% 
    //renew token via authentication 
  }

}
