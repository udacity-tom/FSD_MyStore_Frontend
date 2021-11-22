import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
//need to undo this quick fix constructor element
  constructor(private tokenService: TokenService, private loginAuth: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
  token: string = '';
  expiry: number = 0;
  user: string = '';
  currentToken: object = {token: this.token, expiry: this.expiry, user: this.user};
  loginStatus: boolean = false;

  currentLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
    })
    console.log('Navbar loginStatus', this.loginStatus);
  }

interceptRequest(req: HttpRequest<any>, next: HttpHandler) {
  // const currentToken = of(this.tokenService.getToken());
if(this.loginStatus){
    this.tokenService.getToken().subscribe(res =>  {
      // if(this.loginStatus)
      this.currentToken = res;
      console.log('interceptor currenttoken', this.currentToken);
      }
    );
  } else {
  return this.currentToken;
  }
  console.log('token in interceptor', this.currentToken);
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer '+this.token)
  });
  return next.handle(authReq);
}


}
