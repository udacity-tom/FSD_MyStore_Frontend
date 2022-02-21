import { Component, DoCheck, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  loginStatus: boolean;
  username: string;

  constructor(private loginAuth: LoginService, private tokenService: TokenService  ) {
    this.loginStatus = false;
    this.username = '';
  }

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  ngDoCheck(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if (this.loginStatus){
        this.tokenService.getToken().subscribe(token => {
          this.username = token.user;
        });
      } else {
        this.username = '';
      }
    });
  }
}
