import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  title: string = 'Checkout Here';
  text: string = 'Please input your address to checkout';
  explanation: string = 'In order to provide a seemless checkout process we need your full details.'
  // firstname: string = '';
  // lastname: string = '';
  // houseNumber: string = '';
  // streetAddress: string = '';
  // // streetAddress2: string = '';
  // city: string = '';
  // postcode: string = '';
  // country: string = '';
  user: User = {id: 0, username: '', firstname: '', lastname: '', password: '', housenum: '', street1: '', city: '', postcode: '', country: ''};
  activeOrder: number = 0;
  orderStatus: Order = {
    'id': 0,
    'user_id': 0,
    'status': "active"
};

  loading: boolean = false;
  loginStatus: boolean = false;
  userId: number = 0;

  constructor(
    private cartService: CartService, 
    private orderService: OrdersService, 
    private router: Router,
    private userService: UserService 
    ) { }

  ngOnInit(): void {
    this.userId = this.currentUserId();
    this.orderService.currentActiveOrder().subscribe(res => {
      this.activeOrder = res;
      console.log('checkout component, this.activeOrder, res', this.activeOrder, res);
    });

    this.userService.show(this.userId).subscribe(res => {
      console.log('res from show user', res);
      this.user = res;
    })
    // console.log(this.userService.show(this.userId));
  }

  onSubmit(): void {
    this.updateUserDetails();
    this.completeOrder();
    this.router.navigate(['/confirmation']);
  }

  updateUserDetails(): void{
    this.userService.updateUserDetails(this.user
      // this.firstname,
      // this.lastname,
      // this.houseNumber,
      // this.streetAddress,
      // this.city,
      // this.postcode,
      // this.country      
      ).subscribe(res => {
        console.log('checkout.component.ts', res);
      })
    }
   
    currentUserId(): number {
      return this.userService.getUserId();
    }

    completeOrder(): void {
      console.log('completeOrder(), checkout component this.userId, this.activeOrder', this.userId, this.activeOrder)
      this.orderService.completeOrder(this.activeOrder).subscribe(res => {
          console.log('update order completeOrder res', res);
          this.orderStatus = res;
          if(res.status == 'complete') {
            this.createNewActiveOrder();
          }

      })
    }

    createNewActiveOrder():void {
      this.currentUserId();
      this.orderService.createOrder(String(this.userId)).subscribe(res => {
        console.log('createNewActiveOrder()', res);
      });
    }

}
