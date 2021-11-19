import { Component, OnInit } from '@angular/core';
import { of, Observable,  } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { NavigationExtras } from '@angular/router';


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
  
  constructor(
    private loginAuth: LoginService, 
    private tokenService: TokenService, 
    private router: Router, 
    private route: ActivatedRoute) { 

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
    // this.router.navigate(['loggedin', {relativeTo: this.route}])
    this.router.navigate(['loggedin'])
  }

  updateLoginStatus():void { 
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
      this.tokenService.getToken().subscribe(res => {
        this.username = res.user;
      })

    })
    // this.loginStatus = of(this.loginAuth.loginStatus().subscribe());
    // this.loginAuth.logStatus().subscribe();
  }

  // getUsername()

  getLogin(username: string, password: string) {
    return this.loginAuth.authUser(username, password)//something fishy going on here this shouldn't be this.
    .subscribe(
      res => {
        this.returnedJWT = res;
        // console.log('this.returnedJwt-login component', this.returnedJWT);
        // this.returnedJWT.user = username;
        this.tokenService.setToken(this.returnedJWT);
      }
    );
  }
}