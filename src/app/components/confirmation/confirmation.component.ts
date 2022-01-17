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
      console.log('res from show user', res);
      this.currentUser = res;
    });
    this.orderService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
      console.log('checkout component, this.activeOrder, res', this.activeOrder, res);
    });

  }

  /*find current orders, take the last but one order
  print it out on screen
  */
}
