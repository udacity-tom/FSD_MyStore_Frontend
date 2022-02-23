import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderProducts } from 'src/app/models/OrderProducts';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ProductService } from 'src/app/service/products.service';
interface CartProduct extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
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

 constructor(
  private loginService: LoginService,
  private tokenService: TokenService,
  private router: Router,
  private ordersService: OrdersService,
  private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.updateLoginStatus(); // check if user is logged in, (if yes update cart with active order)
    this.getActiveOrder();    // get all orders on system BE for user
  }

  onChanges(): void {
    this.getActiveOrder();
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

  getActiveOrder(): void {
    this.ordersService.activeOrder().subscribe(order => {
      this.activeOrderNum = order.id;
      this.productsInActiveOrder(order.id);
    });
  }

  productsInActiveOrder(oid: number): void { // gets the products in the active order (list)
    this.ordersService.orderDetails(oid).subscribe(res => {
      this.orderProducts = res;
      this.productsInActiveCart();
    });
  }

  productsInActiveCart(): void { //  pushes products in active order to cart.
    this.orderProducts.forEach(item => {
      this.productService.getProduct(item.productid).subscribe(res => {
        res = Object.assign(res, {quantity: item.quantity, order_productsId: item.id, orderId: item.orderid});
        this.cartTotal += Number(res.price) * Number(res.quantity);
        this.cart.push(res);
      });
    });
    if (this.orderProducts.length !== 0) {
      this.currentCartStatus = true;
    }
  }

  removeItemFromCart(product: CartProduct): boolean {
    this.ordersService.removeCartItem(product.quantity, product.orderId, product.id, product.order_productsId).subscribe(res => {
      const wasDeleted = res;
      if (Number(res.productid) === product.id) {
        alert(`'${product.name}' was removed from the cart!`);
      }
      this.getActiveOrder();
      location.reload();
    });
    return false;
  }

  checkout(): void{
    this.router.navigate(['/checkout']);
  }
}
