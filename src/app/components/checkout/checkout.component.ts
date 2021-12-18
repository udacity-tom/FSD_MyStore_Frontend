import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

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
  streetAddress2: string = '';
  city: string = '';
  postcode: string = '';
  country: string = '';
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



    //start checkout process, update DB, print summary confirmation.   
    //update order as completed
    //clear cart return user to products.
    //show confirmation page
    this.router.navigate(['/confirmation']);
  }

}
