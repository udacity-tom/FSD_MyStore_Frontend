import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders.service';
import { Order } from 'src/app/models/Order';
import { of } from 'rxjs';
import { Order_products } from 'src/app/models/Order_products';
import { ProductService } from 'src/app/service/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Product[] = [];  //products in cart
  @Output() removeItemFromCart: EventEmitter<Product> = new EventEmitter;
  cartTotal: number = 0;

  currentOrder: Order = {id: 0, user_id: 0, status: ''}; //The DB order where status ='active'
  @Input() cartOrder: Order = {id: 0, user_id: 0, status: ''}; //the current user cart to update to DB onChange
  allOrders: Order[] = []; //all user orders on DB
  orderProducts: Order_products[] = [{id: 0, product_id: 0, quantity: 0, order_id: 0}];//order transactions
  product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };
  loginStatus: boolean = false;
  username: string = '';

  constructor(
    private loginService: LoginService, 
    private tokenService: TokenService, 
    private router: Router,
    private ordersService: OrdersService,
    private productService: ProductService
     ) { }

  ngOnInit(): void {
    //check if user is logged in, if yes update cart with active order
    this.updateLoginStatus()
    if(this.loginStatus){
      this.userOrders();//get all orders on system for user
    }
  }

  onChanges() {
    //update the cart with changes: adding products, removing products, checkout, etc...if necessary
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

  userOrders(): void {
    this.ordersService.getOrders().subscribe(res => {
      // console.log('res', res);
      this.allOrders = res;
      this.activeOrder(res);
    });
  }
  
  activeOrder(allOrders: Order[]):void {
    const justOne =  allOrders.filter(order => {  
      return order.status == 'active';
    });
    this.currentOrder = justOne[0];//takes just one order from array, array->item
    // console.log('this.currentOrder, this.allOrders', this.currentOrder, 'this.currentOrder.id', this.currentOrder.id,  this.allOrders);
    this.productsInActiveOrder();
  }
  
  
  productsInActiveOrder() { //gets the products in the active order
    this.ordersService.orderDetails(this.currentOrder.id).subscribe(res => {
      // console.log('res in proudctsInActiveOrder', res);
      this.orderProducts = res;
      this.productsInActiveCart();
    })
  }
  
  productsInActiveCart(): void {
    this.orderProducts.forEach(item =>{
      this.productService.getProduct(item.product_id).subscribe(res => {
        this.cartTotal += Number(res.price);
        this.cart.push(res);
      });
    });
  }

  removeCartItem(pid: number) {
    console.log('Remove the item with Product ID of ', pid);
  }
}


// }
