import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders.service';
import { Order } from 'src/app/models/Order';
import { of } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Product[] = [];  //products in cart
  currentOrder: Order[] = [{id: 0, user_id: 0, status: ''}]; //The DB order where status ='active'
  @Input() cartOrder: Order = {id: 0, user_id: 0, status: ''}; //the current user cart to update to DB onChange
  allOrders: Order[] = []; //all user orders on DB
  // {id: 0, user_id: 0, status: ''}
  loginStatus: boolean = false;
  username: string = '';

  constructor(
    private loginService: LoginService, 
    private tokenService: TokenService, 
    private router: Router,
    private orders: OrdersService,
     ) { }

  ngOnInit(): void {
    //check if user is logged in, if yes update cart with active order
    this.orderInCart();
    this.activeOrder(this.allOrders);
    this.updateLoginStatus();
    console.log('active order', this.currentOrder, this.allOrders,  )
  }

  onChanges() {
    //update the cart with changes: adding products, removing products, checkout, etc...
  }


  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if(!this.loginStatus){
        console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        // this.router.navigate(['/', {relativeTo: this.route}]);
        // this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(res => {
        this.username = res.user;
      })
    });
  }

  orderInCart(): void {
    this.orders.getOrders().subscribe(res => {
      console.log('res', res);
      this.allOrders = res;
      this.activeOrder(res);
    });
    console.log('this.currentOrder, this.allOrders', this.currentOrder, this.allOrders);
      // console.log('active order', this.currentOrder )
    }
  

  activeOrder(allOrders: Order[]) {
      this.currentOrder = allOrders.filter(order => {  
      return order.status == 'active';
      }
    );
  }
  
}
//what is a cart?
/*
This cart takes any active orders and lists out their products
the cart 'state' is held here as an array of products as listed in the DB
The DB is the source of truth. maintaining persistance across the app.
so here the first thing we do after loggin in is updtate the cart state here
and modify the cart page to display the list of items.

create a service to interlink the cart to the products and display the included products.
click on product takes the user to the product details page

*/


// }
