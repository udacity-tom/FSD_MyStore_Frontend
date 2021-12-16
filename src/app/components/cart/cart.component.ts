import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Order_products } from 'src/app/models/Order_products';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ProductService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';

interface Cart_product extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Cart_product[] = [];  //products in cart
  @Input() cartOrder: Order = {id: 0, user_id: 0, status: ''}; //the current user cart to update to DB onChange
  
  
  cartTotal: number = 0.00;
  currentOrder: Order = {id: 0, user_id: 0, status: ''}; //The DB order where status ='active'
  allOrders: Order[] = []; //all user orders on DB
  orderProducts: Order_products[] = [{id: 0, product_id: 0, quantity: 0, order_id: 0}];//order transactions
  product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };
  loginStatus: boolean = false;
  username: string = '';
  addedCartItem: number = 0;

  currentCartStatus = false;

  constructor(
    private loginService: LoginService, 
    private tokenService: TokenService, 
    private router: Router,
    private ordersService: OrdersService,
    private productService: ProductService,
    private cartService: CartService
     ) { }

  ngOnInit(): void {
    this.updateLoginStatus()//check if user is logged in, if yes update cart with active order
      this.userOrders();//get all orders on system for user
  }
  
  onChanges() {
    //update the cart with changes: adding products, removing products, checkout, etc...if necessary
  }

  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if(!this.loginStatus){
        console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(res => {
        this.username = res.user;
      })
    });
  }

  userOrders(): void {
    this.ordersService.getOrders().subscribe(res => {
      this.allOrders = res;
      if(res.length == 0) {
        this.ordersService.createOrder();
      }
      this.ordersService.activeOrder( res ).subscribe(response => {
        this.currentOrder = response;//this.allOrders[response.id];
        this.productsInActiveOrder(response);
      })
    });
  }
  
  productsInActiveOrder(currentOrder: object): void { //gets the products in the active order
    this.ordersService.orderDetails(this.currentOrder.id).subscribe(res => {
      this.orderProducts = res;
      this.productsInActiveCart();
    })
  }
  
  productsInActiveCart(): void { //gets products in  active order and pushes them to cart.
    this.orderProducts.forEach(item => {
      this.productService.getProduct(item.product_id).subscribe(res => {
        res = Object.assign(res, {quantity: item.quantity, order_productsId: item.id, orderId: item.order_id});
        this.cartTotal += Number((res.price*Number(res.quantity)).toFixed(2));
        this.cart.push(res);
      });
    });
    if(this.orderProducts.length != 0) {
      this.currentCartStatus = true;
    }
  }

    removeItemFromCart(product: Cart_product): boolean {
      this.ordersService.removeCartItem(product.quantity, product.orderId, product.id, product.order_productsId).subscribe(res => {
        const wasDeleted = res;
        if(wasDeleted){
          console.log('The item ',product.id, product.order_productsId,' was deleted!')
         
        }
        return true;
      })
      return false;
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }
}