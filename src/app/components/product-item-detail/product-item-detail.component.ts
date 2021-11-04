import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() products: Product[] = [];
  // productDetail:
  product: Product;
  noOfItems: number = 1;

  constructor(private productService:ProductService) { 
    // this.product = {
    //   id: 0,
    //   name: '',
    //   url: '',
    //   price: 0,
    //   snippet: '',
    //   description: '',
    //   accreditation: '',
    //   category: ''
    // }
    
  }
  
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  increaseItems() {
    this.noOfItems +=1
  }
  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems -=1
  }
}
