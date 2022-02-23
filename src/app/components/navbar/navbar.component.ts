import { Component, DoCheck, OnInit } from '@angular/core';
// import { Order } from 'src/app/models/Order';
import { LoginService } from 'src/app/service/login.service';
import { OrdersService } from 'src/app/service/orders.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  loginStatus: boolean = false;
  username: string = '';
  activeOrderNum = 0;
  itemsInCart = 0;

  constructor(
    private loginAuth: LoginService,
    private tokenService: TokenService,
    private ordersService: OrdersService
    ) {
  }

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  ngDoCheck(): void {
    this.updateLoginStatus();
    this.ordersService.cartItems.subscribe(res => {
      this.itemsInCart = res;
    })
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
