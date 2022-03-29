import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/service/orders.service';
import { OrderProducts } from 'src/app/models/OrderProducts';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';

interface CartProduct extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}
@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})

export class LoggedInComponent implements OnInit {
  @Input() currentOrderDetails: OrderProducts[] = [ {id: 0, productid: 0, quantity: 0, orderid: 0}];
  username = '';
  token = '';
  currentOrders: Order[] = [];
  products: CartProduct[] = [];
  noOfCompletedOrders: Order[] = []; // ngif status indicator on html page
  showOrderDetails = false; // ngif status indicator on html page
  loginStatus = false;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private ordersService: OrdersService,
    private productsService: ProductService
    ) {
  }

  ngOnInit(): void {
    this.existingOrders();
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  onChanges(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
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

  existingOrders(): void {
    this.ordersService.getOrders().subscribe(res => {
      if (res.length === 0 || res === undefined){
        this.ordersService.createOrder().subscribe(order => {
          const orderServiceResult = order;
          return orderServiceResult;
        });
        this.existingOrders();
      }
      this.currentOrders = res;
      this.completedOrders(res);
      this.ordersService.activeOrder().subscribe( activeOrderNum => {
        this.ordersService.countCartItems(activeOrderNum.id);
      });
    });
  }

  completedOrders(currentOrders: Order[]): void {
    this.noOfCompletedOrders = currentOrders.filter(item => {
      return item.status === 'complete';
    });
  }

  orderDetails(oid: number): void {
    this.products = [];
    this.ordersService.orderDetails(oid).subscribe(res => {
      this.currentOrderDetails = res;
      res.forEach(item => {
        this.productsService.getProduct(item.productid).subscribe(product => {
          product = Object.assign(product, {quantity: item.quantity, order_productsId: item.id, orderId: item.orderid});
          this.products.push(product);
        });
      });
    });
    this.showOrderDetails = true;
  }

  logout(): void {
    this.loginService.logOut(this.username);
  }
}

