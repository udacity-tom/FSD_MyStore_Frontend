import { Component, OnInit, OnChanges } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //setup login name based on login status
  loginStatus: boolean = false;
  blurb:string = 'Our range of products will entice your desires.'
  moreBlurb:string = 'When you\'ve filled your Cart with our wares, please check out for a rapid delivery. \nRegister now to speed the check-out process.';
  username: string = '';


  constructor(private loginAuth: LoginService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
  }
  
  onChanges(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  updateLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if(!this.loginStatus){
        console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        // this.router.navigate(['/', {relativeTo: this.route}]);
        this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(res => {
              this.username = res.user;
            })
    })
    console.log('logged-in componet loginStatus', this.loginStatus);
  }

}
