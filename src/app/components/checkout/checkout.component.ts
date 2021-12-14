import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';

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
    console.log('Checkout button pressed!');
    //start checkout process, update DB, print summary confirmation.   
    //update order as completed
    //clear cart return user to products.

  }

  currentCssClass (){
    
  }

}
