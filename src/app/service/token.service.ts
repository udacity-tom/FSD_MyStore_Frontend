import { Injectable } from '@angular/core';
// import { Jwt } from 'jsonwebtoken';
// import { Jwt } from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
// import { JwtPayload } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  currentToken: string = this.getToken();
  timeToExpiry: number = 0;

  constructor() { }


  setToken(storedToken: object) {
    console.log('token.service', storedToken);
   localStorage.currentToken = JSON.stringify(storedToken);   
  }

  getToken(){
    let storedToken: string = '';
    storedToken = JSON.parse(localStorage.currentToken);
    return storedToken;
  }

  getCurrentExpiry(){
    if(this.currentToken) {
      // this.timeToExpiry = Jwt.decode(this.currentToken, {complete: true}).payload.exp;
    }
  }

}
