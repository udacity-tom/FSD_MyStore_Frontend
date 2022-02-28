import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderProducts } from 'src/app/models/OrderProducts';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { OrdersService } from 'src/app/service/orders.service';
interface CartProduct extends Product {
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

 cart: CartProduct[] = [];  // products in cart
 cartOrder: Order = {id: 0, userId: 0, status: ''}; // the current user cart to update to DB onChange
 cartTotal = 0.00;
 currentOrder: Order = {id: 0, userId: 0, status: ''}; // The DB order where status ='active'
 allOrders: Order[] = []; // all user orders on DB
 activeOrderNum = 0;
 orderProducts: OrderProducts[] = [{id: 0, productid: 0, quantity: 0, orderid: 0}]; // order transactions
 product: Product = {id: 0, name: '', url: '', price: 0, snippet: '', description: '', accreditation: '', category: '' };
 loginStatus = false;
 username = '';
 addedCartItem = 0;
 currentCartStatus = false;
 itemsInCart = 0;

 constructor(
  private loginService: LoginService,
  private tokenService: TokenService,
  private router: Router,
  private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.updateLoginStatus(); // check if user is logged in, (if yes update cart with active order)
    // get all orders on system BE for user
    this.productsInActiveCart();
  }

  onChanges(): void {
    this.productsInActiveCart();
  }

  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if (!this.loginStatus){
        this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(token => {
        this.username = token.user;
      });
    });
  }

  productsInActiveCart(): void { //  pushes products in active order to cart.
    this.ordersService.cartContent.subscribe(res => {
      console.log('cart.component res from cartContent', res);  
      this.cart = res;
      res.forEach(item => {
        console.log('cart component', item);
        this.cartTotal += Number(item.price) * Number(item.quantity);
      });
    })
    this.cart.forEach(item => {
      console.log('cart component ', item);
    })
    if (this.orderProducts.length !== 0) {
      this.currentCartStatus = true;
    }
  }

  removeItemFromCart(product: CartProduct): boolean {
    this.ordersService.removeCartItem(product.quantity, product.orderId, product.id, product.order_productsId).subscribe(res => {
      // const wasDeleted = res;
      if (Number(res.productid) === product.id) {
        alert(`'${product.name}' was removed from the cart!`);
      }
      location.reload();
    });
    return false;
  }

  checkout(): void{
    this.router.navigate(['/checkout']);
  }
}
