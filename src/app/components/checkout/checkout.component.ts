import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  title: string = 'Checkout Here';
  text: string = 'Please input your address to checkout';
  explanation: string = 'In order to provide a seemless checkout process we need your full details.'
  firstname: string = '';
  lastname: string = '';
  houseNumber: string = '';
  streetAddress: string = '';
  // streetAddress2: string = '';
  city: string = '';
  postcode: string = '';
  country: string = '';

  currentOrderId: number = 0;
  orderStatus: Order = {
    "id": 0,
    "user_id": 0,
    "status": "active"
};

  loading: boolean = false;
  loginStatus: boolean = false;

  constructor(
    private cartService: CartService, 
    private orderService: OrdersService, 
    private router: Router,
    private userService: UserService 
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Checkout button pressed!');
    //process user details to DB
    this.updateUserDetails();
    this.currentOrder();
    this.completeOrder();
    
    //start checkout process
    // show current user address details, 
    // update DB, 
    //update order as completed
    //show confirmation page: print summary confirmation of dispatch address/order details
    //clear cart return user to products.
    this.router.navigate(['/confirmation']);
  }

  updateUserDetails(){
    this.userService.updateUserDetails(
      this.firstname,
      this.lastname,
      this.houseNumber,
      this.streetAddress,
      this.city,
      this.postcode,
      this.country      
      ).subscribe(res => {
        console.log('checkout.component.ts', res);
      })
    }
    currentOrder(): void {
      this.orderService.currentActiveOrder().subscribe((res: number) => {
        this.currentOrderId = res;
      })
    }
    completeOrder() {
      this.orderService.completeOrder(this.userService.getUserId(), this.currentOrderId).subscribe(res => {
        this.orderStatus = res;
      })
    }

}
