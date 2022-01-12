import { Component, OnInit, OnChanges } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  // setup login name based on login status
  loginStatus = false;
  blurb = 'View our range of products.';
  moreBlurb = 'Please register to place items in your Cart. When finished, click checkout for delivery. Register now to speed the check-out process.';
  username = '';


  constructor(private loginService: LoginService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  ngOnChanges(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if (!this.loginStatus){
        // console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        // this.router.navigate(['/', {relativeTo: this.route}]);
        this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(token => {
              this.username = token.user;
            });
    });
    console.log('logged-in componet loginStatus', this.loginStatus);
  }

}
