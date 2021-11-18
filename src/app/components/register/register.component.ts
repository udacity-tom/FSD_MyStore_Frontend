import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  returnedJWT: object = {};
  token: string = '';
  authFn: object = {};
  loading: boolean = false;
  returnedRes: object = {};
  newUser: object = {};
  newtoken: string = '';
  payload: object = {};
  tokenToSet: object = {};
  exp: number = 0;


  constructor(private loginAuth: LoginService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.returnedRes = this.registerUser(this.username, this.firstname, this.lastname, this.password);
     // this.returnedJWT = this.returnedRes[1] as object;
    // console.log('returned res from api on user create', this.returnedRes);
    this.loading = false;
  }
  
  registerUser(username: string, firstname: string, lastname: string, password: string ): object {
    // console.log('register component', username, firstname, lastname, password);
    return this.loginAuth.registerNewUser( username, firstname, lastname, password ).subscribe(
      res => {   //TO-DO: this MUST be refactored, something to with the interface?
        this.returnedRes = res;
        this.newtoken = Object.values(this.returnedRes)[1];
        this.payload = Object.values(this.returnedRes)[2].payload;
        this.exp = Object.values(this.payload)[13];
        this.tokenService.setToken({token: this.newtoken, expiry: this.exp, user: this.username} );
      }
    );
  }
}
