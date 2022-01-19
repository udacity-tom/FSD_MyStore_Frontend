import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  returnedJWT: object = {token: '', expiry: 0, uid: 0, user: ''};
  token = '';
  authFn: object = {};
  loading = false;
  loginStatus = false;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.updateLoginStatus();
    console.log('login.component ngOnInit ran')
    if (!this.loginStatus){
      this.username = '';
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['loggedin']);

  }

  onSubmit(): void {
    this.loading = true;
    console.log('onSubmit(), this.username, this.password', this.username, this.password);
    this.getLogin(this.username, this.password);
    this.loading = false;
  }

  reRouteUser(): void {
    this.router.navigate(['loggedin']);
  }

  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      this.tokenService.getToken().subscribe(token => {
        this.username = token.user;
      });
    });
  }

  getLogin(username: string, password: string): void {
    this.loginService.authUser(username, password).subscribe(res => {
      this.returnedJWT = res;
      this.tokenService.setToken(this.returnedJWT);
      this.updateLoginStatus();
      if(this.loginStatus) {
        //notify user successful login
        this.reRouteUser();
      } else {
        // notify user unsuccessful login
        this.username = '';
        this.password = '';
        this.router.navigate(['/login']);
      }
    })
  }
}
