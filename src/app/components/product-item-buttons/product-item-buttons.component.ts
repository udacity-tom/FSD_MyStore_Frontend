import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-item-buttons',
  templateUrl: './product-item-buttons.component.html',
  styleUrls: ['./product-item-buttons.component.css']
})
export class ProductItemButtonsComponent implements OnInit {
  @Input() product: Product;

  showCss: boolean = false;
  pid: number = 0;
  response: object = {};
  quantity: number = 1;

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

  addProductsToCart(pid: number, quantity: number){
    console.log('product ', pid, ' added to order. Quantity is ', quantity)
    this.cartService.addProductToActiveOrder(pid, quantity).subscribe(res => {
      this.response = res;
      console.log('product-list add to cart res', res);
    })
  }
}
