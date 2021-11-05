import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item-buttons',
  templateUrl: './product-item-buttons.component.html',
  styleUrls: ['./product-item-buttons.component.css']
})
export class ProductItemButtonsComponent implements OnInit {
  @Input() product: Product;

  showCss: boolean = false;

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

}
