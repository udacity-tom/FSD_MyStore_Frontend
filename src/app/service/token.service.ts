import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

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


}
