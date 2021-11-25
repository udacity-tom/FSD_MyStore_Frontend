import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginStatus: boolean;
  username: string;


  constructor(private loginAuth: LoginService, private tokenService: TokenService  ) { 
    this.loginStatus = false;
    this.username = '';
  }

  // ngOnChanges(): void {
  //   this.updateLoginStatus();
  //   this.getUsername();
  // }

  ngOnInit(): void {
    this.updateLoginStatus();
    this.getUsername();
  }

  ngDoCheck(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
    })
    // console.log('Navbar loginSTatus', this.loginStatus);
  }

  getUsername(): void {
    this.tokenService.getToken().subscribe(res => {
      this.username = res.user;
    })
    // console.log('navbar getusername()', this.username);

  }
  
  // getuser(): void {
  //   this.username = this.tokenService.getCurrentUser();
  // }

}
