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

  constructor(private loginAuth: LoginService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.returnedJWT = this.registerUser(this.username, this.firstname, this.lastname, this.password);
    this.loading = false;
  }

  registerUser(username: string, firstname: string, lastname: string, password: string ): object {
    console.log('register component', username, firstname, lastname, password);
    return this.loginAuth.registerNewUser( username, firstname, lastname, password ).subscribe();
  }

}
