import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';

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

  constructor(private cartService: CartService) { 
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
}
