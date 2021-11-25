import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/service/orders.service';
import { Order_products } from 'src/app/models/Order_products';
// import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  username: string = '';
  password: string = '';
  returnedJWT: object = {};
  token: string = '';
  authFn: object = {};
  loading: boolean = false;
  currentOrders: Order[] = [];
  noOfCompletedOrders: Order[] = [];
  @Input() currentOrderDetails: Order_products[] = [ {id: 0, product_id: 0, quantity: 0, order_id: 0}];
  showOrderDetails: boolean = false;
  loginStatus: boolean;


  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;

  constructor(
    private http: HttpClient, 
    private loginAuth: LoginService, 
    private tokenService: TokenService, 
    private router: Router, 
    private route: ActivatedRoute,
    private orderService: OrdersService
    ) { 
    this.loginStatus = false;

  }

  ngOnInit(): void {
    this.existingOrdersService();
    // this.noOfCompletedOrders = this.currentOrders.filter(item => {
    //   item.status == 'complete';
    // });
    this.completedOrders(this.currentOrders);
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  onChanges(): void {
    this.updateLoginStatus();
    this.tokenService.getToken();
  }

  updateLoginStatus(): void {
    this.loginAuth.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if(!this.loginStatus){
        console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        // this.router.navigate(['/', {relativeTo: this.route}]);
        this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(res => {
              this.username = res.user;
            })
    });
  }

  existingOrdersService () {
    this.orderService.getOrders().subscribe(res => {
      this.currentOrders = res;
      this.completedOrders(res);
    });
  }
  
  completedOrders(currentOrders: Order[]) {
    this.noOfCompletedOrders = currentOrders.filter(item => {
      return item.status == "complete";
    })
  }

  onSubmit(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe(res => {
      this.currentOrders = res;
    });
    this.noOfCompletedOrders = Array.from(this.currentOrders.filter(el => {
      return el.status == 'complete'
    })); 
    this.updateLoginStatus();
    this.loading = false;
    // this.router.navigate(['loggedin', {relativeTo: this.route}])
    // this.router.navigate(['loggedin'])
  }

  orderDetails(oid:number): void {
    this.orderService.orderDetails(oid).subscribe(res => {
      console.log('res from orderDetails', res);
      this.currentOrderDetails = res;
    });
    this.showOrderDetails = true;
    console.log('orderDetails', oid);
  }


  logout():void {
    console.log('logout() run from logged-in component');
    this.tokenService.deleteToken();
    this.router.navigate(['/'])
  }

  // updateLoginStatus():void { 
  //   this.loginAuth.loginStatus().subscribe(res => {
  //     this.loginStatus = res;
  //     this.tokenService.getToken().subscribe(res => {
  //       this.username = res.user;
  //     })

  //   })
  // getAllUserOrders() {

  // }

}
