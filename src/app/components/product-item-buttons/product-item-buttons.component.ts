import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';

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
  activeOrder: number = 0;

  constructor(private cartService: CartService, private orderService: OrdersService) { 
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
    console.log('product ', pid, ' added to order. Quantity is ', quantity, 'activeOrder number', this.activeOrder);
    this.orderService.currentActiveOrder().subscribe(res => {
      this.activeOrder = res;
    })
    this.cartService.addProductToActiveOrder(pid, quantity, this.activeOrder).subscribe(res => {
      this.response = res;
      console.log('product-list add to cart res', res);
    })
  }
}
