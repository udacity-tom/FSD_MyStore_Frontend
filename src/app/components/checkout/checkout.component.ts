import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  title: string = 'Checkout';
  text: string = 'Please input your address to checkout';
  firstname: string = '';
  lastname: string = '';
  houseNumber: string = '';
  streetAddress: string = '';
  streetAddress2: string = '';
  city: string = '';
  postcode: string = '';
  country: string = '';


  // returnedJWT: object = {};
  // token: string = '';
  // authFn: object = {};
  loading: boolean = false;
  // stream: Observable<string> = '';
  loginStatus: boolean = false;


  constructor(private cartService: CartService, private orderService: OrdersService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Checkout Submit button pressed!');
    //start checkout process, update DB, print summary confirmation.    
  }
}
