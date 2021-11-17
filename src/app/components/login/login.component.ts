import { Component, OnInit } from '@angular/core';
import { of, Observable,  } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  returnedJWT: object = {};
  token: string = '';
  authFn: object = {};
  loading: boolean = false;
  // stream: Observable<string> = '';
  loginStatus: boolean = false;
  
  constructor(private loginAuth: LoginService, private tokenService: TokenService) { 

  }

  ngOnInit(): void {
    this.updateLoginStatus();
    
  }
//To-do: Refactor
  onSubmit(): void {
    this.loading = true;
    this.returnedJWT = this.getLogin(this.username, this.password);
    this.updateLoginStatus();
    this.loading = false;
    // this.tokenService.setToken(this.returnedJWT);
    // console.log('stored Token login component', this.tokenService.getToken());
  }

  updateLoginStatus():void { 
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
    })


    // this.loginStatus = of(this.loginAuth.loginStatus().subscribe());
    // this.loginAuth.logStatus().subscribe();
    
  }

  getLogin(username: string, password: string) {
    return this.loginAuth.authUser(this.username, this.password)//something fishy going on here this shouldn't be this.
    .subscribe(
      res => {
        this.returnedJWT = res;
        this.tokenService.setToken(this.returnedJWT, username);
      }
    );
  }
}