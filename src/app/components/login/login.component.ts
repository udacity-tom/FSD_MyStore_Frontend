import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    alert(``)
  }


}
