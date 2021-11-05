import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  // @Output() product: Product;
  // noOfItems: number = 1;
  showButtons: boolean = false;
  showCss: boolean = false;
  value: boolean = false;
  mouseEnter(div: string){
    this.value = true;
  }
  mouseLeave(div: string) {
    this.value = false;
  }

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

  // increaseItems() {
  //   this.noOfItems +=1
  // }
  // decreaseItems() {
  //   if(this.noOfItems==1) return;
  //   this.noOfItems -=1
  // }
  addToCart() {

  }

}
