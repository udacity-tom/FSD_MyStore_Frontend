import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = '';
  firstname = '';
  lastname = '';
  password = '';
  returnedJWT: object = {};
  token = '';
  authFn: object = {};
  loading = false;
  returnedRes: object = {};
  newUser: object = {};
  newtoken = '';
  payload: object = {};
  tokenToSet: object = {};
  exp = 0;


  constructor(private userService: UserService, private tokenService: TokenService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.router.navigate(['login']);
  }

  onSubmit(): void {
    this.loading = true;
    this.returnedRes = this.registerUser(this.username, this.firstname, this.lastname, this.password);
    this.loading = false;
    this.toastService.show(`Welcome ${this.username}`, `New account created for ${this.firstname} ${this.lastname}, username: '${this.username}'. \nPlease login!`);
    this.router.navigate(['/login']);
  }

  registerUser(username: string, firstname: string, lastname: string, password: string ): object {
    return this.userService.registerNewUser( username, firstname, lastname, password ).subscribe(
      res => {   // TO-DO: this MUST be refactored, accessing via array method, better way?, something to with the interface?
        this.returnedRes = res;
        this.newtoken = Object.values(this.returnedRes)[1];
        this.payload = Object.values(this.returnedRes)[2].payload;
        this.exp = Object.values(this.payload)[13];
        this.tokenService.setToken({token: this.newtoken, expiry: this.exp, user: this.username});
      }
    );
  }
}
