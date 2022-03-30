import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { OrderProducts } from 'src/app/models/OrderProducts';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
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
  activeOrderDetails: OrderProducts[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.showUser(this.userService.getUserId()).subscribe(res => {
      this.currentUser = res;
    });
  }
}
