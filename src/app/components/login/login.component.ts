import { Component, OnInit } from '@angular/core';
import { Observable,  } from 'rxjs';
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
  
  constructor(private loginAuth: LoginService, private tokenService: TokenService) { 

  }

  ngOnInit(): void {
    
  }
//To-do: Refactor
  onSubmit(): void {
    this.loading = true;
    this.returnedJWT = this.getLogin(this.username, this.password);
    this.loading = false;
    console.log('stored Token', this.tokenService.getToken());
  }
  getLogin(username: string, password: string) {
    return this.loginAuth.authUser(this.username, this.password)
    .subscribe(
      res => {
        this.returnedJWT = res;
        this.tokenService.setToken(this.returnedJWT);
      }
      );
  }
}