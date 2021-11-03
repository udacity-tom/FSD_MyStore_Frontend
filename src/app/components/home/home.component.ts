import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //setup login name based on login status
  loginStatus = 'Login';
  blurb = 'Our range of products will entice your desires and line our pockets.'
  moreBlurb = 'When you\'ve filled your Cart with our wares, please check out for a rapid delivery';

  constructor() { }

  ngOnInit(): void {
  }

}
