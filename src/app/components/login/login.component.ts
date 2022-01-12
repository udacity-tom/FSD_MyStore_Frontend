import { Component, OnInit, OnChanges } from '@angular/core';
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
  username = '';
  password = '';
  returnedJWT: object = {};
  token = '';
  authFn: object = {};
  loading = false;
  // stream: Observable<string> = '';
  loginStatus = false;

  constructor(
    private loginAuth: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.updateLoginStatus();

  }

  onChanges(): void {
    if (!this.loginStatus){
      console.log('login component re-route page, this.loginStatus is ', this.loginStatus);
      // this.router.navigate(['/', {relativeTo: this.route}]);
      this.router.navigate(['/']);
      return;
    }
    this.tokenService.getToken().subscribe(res => {
            this.username = res.user;
          });
    this.router.navigate(['loggedin']);
  }

// To-do: Refactor
  onSubmit(): void {
    this.loading = true;
    this.returnedJWT = this.getLogin(this.username, this.password);
    this.updateLoginStatus();
    console.log('login component loginstatus', this.loginStatus);
    // this.router.navigate(['loggedin', {relativeTo: this.route}]);
    // this.router.navigate(['loggedin']);
    this.loading = false;
    this.reRouteUser();
    // location.reload();
    // this.router.navigate(['loggedin']);
  }
  reRouteUser(): void {
    this.router.navigate(['loggedin']);
    // location.reload();
  }

  updateLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
      this.tokenService.getToken().subscribe(token => {
        this.username = token.user;
      });

    });
  }

  getLogin(username: string, password: string): object {
    return this.loginAuth.authUser(username, password)// something fishy going on here this shouldn't be this.
    .subscribe(
      res => {
        this.returnedJWT = res;
        // console.log('this.returnedJwt-login component', this.returnedJWT);
        // this.returnedJWT.user = username;
        this.tokenService.setToken(this.returnedJWT);
        this.router.navigate(['loggedin']);
      }
    );
  }
}
