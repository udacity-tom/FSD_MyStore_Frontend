import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderProducts } from 'src/app/models/OrderProducts';
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
})
export class CartComponent implements OnInit {
 cartTotal = 0.00;
 products: CartProduct[] = [];
 currentOrderDetails: OrderProducts[] = [ {id: 0, productid: 0, quantity: 0, orderid: 0}];
 loginStatus = false;
 username = '';
 currentCartStatus = false;
 titleText1 = 'See Product Description ->';
 activeOrderNum = 0;

 constructor(
  private loginService: LoginService,
  private tokenService: TokenService,
  private router: Router,
  private ordersService: OrdersService,
  private productsService: ProductService
  ) {
    this.activeOrder();
   }

  ngOnInit(): void {
    this.updateLoginStatus(); // check if user is logged in, (if yes update cart with active order)
  }

  OnChanges(): void {
    this.activeOrder();
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

  activeOrder(): number {
    let tempOrderNum = -1;
    this.ordersService.activeOrder().subscribe( orderNum => {
      this.activeOrderNum = orderNum.id;
      tempOrderNum = orderNum.id;
      if ( orderNum.id === 0 ) { return; }
      this.orderDetails(tempOrderNum);
    });
    return tempOrderNum;
  }

  orderDetails(oid: number): void {
    this.products = [];
    this.cartTotal = 0.00;
    this.ordersService.orderDetails(oid).subscribe(res => {
      this.currentOrderDetails = res;
      res.forEach(item => {
        this.productsService.getProduct(item.productid).subscribe(product => {
          product = Object.assign(product, {quantity: item.quantity, order_productsId: item.id, orderId: item.orderid});
          this.products.push(product);
          this.products.sort( (a, b) => {
            return a.id - b.id;
          });
          this.cartTotal += Number(product.price) * Number(product.quantity);
        });
      });
      if (this.currentOrderDetails.length !== 0) {
        this.currentCartStatus = true;
      } else {
        this.currentCartStatus = false;
      }
    });
    this.ordersService.countCartItems(this.activeOrderNum);
  }

  removeItemFromCart(product: CartProduct): void {
    this.ordersService.removeCartItem(product.quantity, product.orderId, product.id, product.order_productsId).subscribe(res => {
      if (Number(res.productid) === product.id) {
        alert(`'${product.name}' was removed from the cart!`);
      }
      this.activeOrder();
    });
  }

  checkout(): void{
    this.router.navigate(['/checkout']);
  }
}
