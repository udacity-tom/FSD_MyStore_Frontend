import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from 'src/app/models/User';
import {
  OrdersService
} from 'src/app/service/orders.service';
import {
  UserService
} from 'src/app/service/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  userId = 0;
  currentUser: User = {
    id: 0,
    username: '',
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
  completedOrder: number = this.activeOrder - 1;

  constructor(private orderService: OrdersService, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userService.showUser(this.userId).subscribe(res => {
      // console.log('confirmation comp res from show user', res);
      this.currentUser = res;
    });
    this.orderService.getOrders().subscribe(orders => {
      console.log('confirmation comp, orders,this.activeOrder, this.completedOrder', orders, this.activeOrder, this.completedOrder);
    })

  }
  // showPreviousOrder(): void
  /*find current orders, take the last but one order
  print it out on screen confirmation
  */
}
