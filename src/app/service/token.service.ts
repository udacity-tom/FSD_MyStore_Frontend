import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  currentToken: string = '';
  timeToExpiry: number = 0;
  tokenObj: object = {currentToken: this.currentToken, timeToExpiry: this.timeToExpiry};

  constructor() { }


  setToken(tokenToSet: object) {
    console.log('token.service', tokenToSet);
   localStorage.currentToken = JSON.stringify(tokenToSet);   
  }

  getToken(): {token: string, expiry: number} {
    let storedToken: {token: string, expiry: number};
    storedToken = JSON.parse(localStorage.currentToken);
    console.log('storedToken token service', storedToken);
    return storedToken;
  }

  getCurrentExpiry(){
    const currentExpiry = this.getToken();
    if(this.getToken()) {
      this.timeToExpiry = currentExpiry.expiry;
      console.log('current Expiry', this.timeToExpiry);
    }
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
