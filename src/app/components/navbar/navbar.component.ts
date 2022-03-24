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
  loginStatus: boolean = false;
  username: string = '';
  itemsInCart: Observable<number>;
  items: number = 0;
  cartItems: number = -1;

  constructor(
    private loginAuth: LoginService,
    private tokenService: TokenService,
    private ordersService: OrdersService,
    ) {
      this.itemsInCart = this.ordersService.cartItems;
    }
    
    ngOnInit(): void {
      this.updateLoginStatus();
      this.itemsInCart.subscribe(num => {
        this.items = num;
      })
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
