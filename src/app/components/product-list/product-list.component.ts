import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string = 'Product List component';
  @Input() products: Product[] = [];
  pid: number = 0;
  quantity: number = 0;
  response: object = {};

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    //raw data return for setting up View, move to backend later
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
   
  }

  // addProductsToCart(pid: number, quantity: number){
  //   console.log('product ', pid, ' added to order. Quantity is ', quantity)
  //   this.cartService.addProductToActiveOrder(pid, quantity).subscribe(res => {
  //     this.response = res;
  //     console.log('product-list add to cart res', res);
  //   })
  // }
 

}
