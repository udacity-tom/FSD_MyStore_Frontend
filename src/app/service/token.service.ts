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
    return of(storedToken);
    } else {
      return of({token: 'no Token', expiry: -1, user: '', uid: 0});
    }
  }

  deleteToken() {
    delete localStorage.currentToken;
  }

  checkToken() {
   
  }

}
