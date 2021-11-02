import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //raw data return for setting up View, move to backend later
    this.products = this.productService.getProducts();

  }

}
