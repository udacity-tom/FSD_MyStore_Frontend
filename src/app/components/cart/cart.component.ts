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
import { of } from 'rxjs';
// import { CartService }

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
  // @Output() removeItemFromCart: EventEmitter<Product> = new EventEmitter;
  cartTotal: number = 0.00;


  currentOrder: Order = {id: 0, user_id: 0, status: ''}; //The DB order where status ='active'
  @Input() cartOrder: Order = {id: 0, user_id: 0, status: ''}; //the current user cart to update to DB onChange
  allOrders: Order[] = []; //all user orders on DB
  orderProducts: Order_products[] = [{id: 0, product_id: 0, quantity: 0, order_id: 0}];//order transactions
  product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };
  loginStatus: boolean = false;
  username: string = '';
  addedCartItem: number = 0;

  constructor(
    private loginService: LoginService, 
    private tokenService: TokenService, 
    private router: Router,
    private ordersService: OrdersService,
    private productService: ProductService,
    private cartService: CartService
     ) { }

  ngOnInit(): void {
    //check if user is logged in, if yes update cart with active order
    this.updateLoginStatus()
    if(this.loginStatus){
      this.userOrders();//get all orders on system for user
    }
  }
  
  onChanges() {
    // this.userOrders();
    // if(this.loginStatus){
    //   this.userOrders();//get all orders on system for user
    // }
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
      this.allOrders = res;
      this.activeOrder(res);
    });
  }

  activeOrder(allOrders: Order[]):void {
    const justOne =  allOrders.filter(order => {  
      return order.status == 'active';
    });
    this.currentOrder = justOne[0];
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
    console.log('productsinactiveCart, this.orderProducts', this.orderProducts);
    this.orderProducts.forEach(item => {
      this.productService.getProduct(item.product_id).subscribe(res => {
        res = Object.assign(res, {quantity: item.quantity, order_productsId: item.id, orderId: item.order_id});
        this.cartTotal += Number((res.price*Number(res.quantity)).toFixed(2));
        this.cart.push(res);
      });
    });
  }

  removeCartItem(quantity: number, orderId: number, productId: number, order_productId: number) {
    console.log('Remove the item with Product ID of ', order_productId);
      // this.ordersService.removeCartItem(id, quantity, orderId, productId, order_productId).subscribe(res => {
      this.ordersService.removeCartItem(quantity, orderId, productId, order_productId).subscribe(res => {
        const wasDeleted = res;
        if(wasDeleted){
          console.log('The item ',productId, order_productId,' was deleted!')
        }
      })
      this.router.navigate(['/cart']);
  }
}