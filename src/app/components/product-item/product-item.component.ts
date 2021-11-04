import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  noOfItems: number = 1;

  constructor() { 
    this.product = {
      id: 0,
      name: '',
      url: '',
      price: 0,
      snippet: '',
      description: '',
      accreditation: '',
      category: ''
    }
  }

  ngOnInit(): void {
  }

  increaseItems() {
    this.noOfItems +=1
  }
  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems -=1
  }
  addToCart() {

  }

}
