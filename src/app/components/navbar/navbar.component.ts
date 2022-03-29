import { Component, DoCheck, OnInit } from '@angular/core';
// import { Order } from 'src/app/models/Order';
import { LoginService } from 'src/app/service/login.service';
import { OrdersService } from 'src/app/service/orders.service';
import { TokenService } from 'src/app/service/token.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  loginStatus = false;
  username = '';
  itemsInCart: Observable<number>;
  items = 0;

  constructor(
    private loginAuth: LoginService,
    private tokenService: TokenService,
    private ordersService: OrdersService,
    ) {
      this.itemsInCart = this.ordersService.cartItems;
      this.itemsInCart.subscribe(num => {
        this.items = num;
      });
    }

    ngOnInit(): void {
      this.updateLoginStatus();
  }

    ngDoCheck(): void {
      this.updateLoginStatus();
      this.itemsInCart.subscribe(num => {
        this.items = num;
      });
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
          this.items = 0;
        }
      });
    }
}
