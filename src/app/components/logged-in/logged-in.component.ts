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
  order: Order = {id: 0, user_id: 0, status: ''};


  apiServer: string = environment.API_SERVER_IP;
  apiPort: string = environment.API_PORT;
  protocol: string = environment.PROTOCOL;

  constructor(
    private http: HttpClient, 
    private loginService: LoginService, 
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
    // this.completedOrders(this.currentOrders);
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
      console.log('logged-in component, res from this.orderService.getOrders() observable', res, res.length);
      if(res.length == 0 || res == undefined){

        this.orderService.createOrder().subscribe(res => {
          console.log('orderService res in logged-in ', res);
          const orderServiceResult = res;
          return orderServiceResult;
        });
        this.existingOrdersService ();
      } 
      this.currentOrders = res;
      this.completedOrders(res);
      console.log('this.noOfCompletedOrders',this.noOfCompletedOrders);
    });
  }
  
  completedOrders(currentOrders: Order[]) {//just return the length, not all the objects
    this.noOfCompletedOrders = currentOrders.filter(item => {
      return item.status == "complete";
    })
  }

  orderDetails(oid:number): void {
    this.orderService.orderDetails(oid).subscribe(res => {
      console.log('orderDetails method on logged-in component res from orderDetails', res);
      this.currentOrderDetails = res;
    });
    this.showOrderDetails = true;
    if( this.currentOrderDetails.length ==0) {
      alert('You haven\'t added anything to your order yet. Visit our products page' );
    }
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
