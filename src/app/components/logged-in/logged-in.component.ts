import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/service/orders.service';
import { OrderProducts } from 'src/app/models/OrderProducts';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})

export class LoggedInComponent implements OnInit {
  @Input() currentOrderDetails: OrderProducts[] = [ {id: 0, productid: 0, quantity: 0, orderid: 0}];
  username = '';
  password = '';
  firstname = '';
  returnedJWT: object = {};
  token = '';
  authFn: object = {};
  loading = false;
  currentOrders: Order[] = [];
  products: Product[] = [];
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
  loginStatus: boolean;
  order: Order = {id: 0, userId: 0, status: ''};


  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private orderService: OrdersService,
    private productsService: ProductService
    ) {
    this.loginStatus = false;
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
    this.orderService.getOrders().subscribe(res => {
      if (res.length === 0 || res === undefined){
        this.orderService.createOrder().subscribe(order => {
          const orderServiceResult = order;
          return orderServiceResult;
        });
        this.existingOrders();
      }
      this.currentOrders = res;
      this.completedOrders(res);
    });
  }

  completedOrders(currentOrders: Order[]): void {// just return the length, not all the objects
    this.noOfCompletedOrders = currentOrders.filter(item => {
      return item.status === 'complete';
    });
  }

  orderDetails(oid: number): void {
    this.products = [];
    this.orderService.orderDetails(oid).subscribe(res => {
      this.currentOrderDetails = res;
      res.forEach(item => {
        this.productsService.getProduct(item.productid).subscribe(product => {
          this.products.push(product);
        })
      });
    });
    this.showOrderDetails = true;
  }

  logout(): void {
    this.loginService.logOut(this.firstname);
    this.router.navigate(['/']);
  }
}

