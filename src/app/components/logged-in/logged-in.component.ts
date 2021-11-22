import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/models/Order';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/service/orders.service';
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
  loginStatus: boolean;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '
  //   })
  // }
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
    this.orderService.getOrders().subscribe(res => {
      this.currentOrders = res;
    })
    console.log('current orders', this.currentOrders);
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
    })
    console.log('logged-in component loginStatus', this.loginStatus);
  }

  onSubmit(): void {
    console.log('this current orders',this.orderService.getOrders());
    this.orderService.getOrders().subscribe(res => {
      this.currentOrders = res;
    })

    this.loading = true;
    // this.returnedJWT = this.getLogin(this.username, this.password);
    this.updateLoginStatus();
    this.loading = false;
    // this.router.navigate(['loggedin', {relativeTo: this.route}])
    // this.router.navigate(['loggedin'])
  }

  // allUsersOrders(): Observable<Order[]> {
    
  // }


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
