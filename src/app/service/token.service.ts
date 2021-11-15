import { Injectable } from '@angular/core';
// import { Jwt } from 'jsonwebtoken';
// import { Jwt } from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';

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
    console.log('storedToken', storedToken);
    return storedToken;
  }

  getCurrentExpiry(){
    const currentExpiry = this.getToken();
    if(this.getToken()) {
      this.timeToExpiry = currentExpiry.expiry;
      console.log('current Expiry', this.timeToExpiry);
    }
  }

}
