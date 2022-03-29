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
  // @Input() product: 
  username = '';
  password = '';
  firstname = '';
  returnedJWT: object = {};
  token = '';
  authFn: object = {};
  loading = false;
  currentOrders: Order[] = [];
  products: CartProduct[] = [];
  currentProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    snippet: '',
    description: '',
    accreditation: '',
    category: '',
  };
  noOfCompletedOrders: Order[] = [];
  showOrderDetails = false;
  loginStatus: boolean = false;
  order: Order = {id: 0, userId: 0, status: ''};

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
      console.log('loggedin comp-orderdetails(), currentorderdetails', res);
      res.forEach(item => {
        this.productsService.getProduct(item.productid).subscribe(product => {
          product = Object.assign(product, {quantity: item.quantity, order_productsId: item.id, orderId: item.orderid});
          console.log('loggedin comp-orderdetails(), product', product)
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

