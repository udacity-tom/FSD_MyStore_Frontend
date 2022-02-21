import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from 'src/app/models/User';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userService.showUser(this.userId).subscribe(res => {
      this.currentUser = res;
    });
  }
}
