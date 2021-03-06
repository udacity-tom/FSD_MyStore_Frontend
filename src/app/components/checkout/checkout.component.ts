import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/service/orders.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  title = 'Checkout Here';
  text = 'Please update/confirm your address to checkout';
  explanation = `Click on any entry below that needs changing.`;
  explanation1 = `This information is required in order to provide a seemless checkout process.`;
  explanation2 = `We need your full details.`;
  user: User = {
    id: 0, username: '',
    firstname: '',
    lastname: '',
    password: '',
    housenum: '',
    street1: '',
    city: '',
    postcode: '',
    country: ''
  };
  activeOrder = 0;
  orderStatus: Order = {
    id: 0,
    userId: 0,
    status: 'active'
};
  loading = false;
  loginStatus = false;
  userId = 0;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.userId = this.currentUserId();
    this.ordersService.activeOrder().subscribe(res => {
      this.activeOrder = Number(res.id);
    });
    this.userService.showUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  onSubmit(): void {
    this.updateUserDetails();
    this.completeOrder();
    if (this.orderStatus) {
      this.router.navigate(['/confirmation']);
    }
  }

  updateUserDetails(): void{
    this.userService.updateUserDetails(this.user
      ).subscribe(res => {
        this.toastService.show(`For ${this.user.username}` , `${this.user.username}'s details were updated!`);
      });
    }

    currentUserId(): number {
      return this.userService.getUserId();
    }

    completeOrder(): void {
      // Add final order check that order has orders and is not blank// if(this.ordersService.getOrders())
      this.ordersService.completeOrder(this.activeOrder).subscribe(res => {
          this.orderStatus = res;
          if (res.status === 'complete') {
            this.ordersService.setCartItems(0);
            this.createNewActiveOrder();
            this.toastService.show(`Order number ${this.activeOrder}`, `Your order with number ${this.activeOrder} was updated, new status: Complete!`);
          }
      });
    }

    createNewActiveOrder(): void {
      this.userId = this.currentUserId();
      this.ordersService.createOrder(String(this.userId)).subscribe(res => {
        this.toastService.show(`New Order Created ${res.id}`, `A new order has been created!`);
      });
    }
}
