import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
interface CartProduct extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-cart-content]',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
})
export class CartContentComponent {
  @Input() product: CartProduct = {
    id: 0,
    name: '',
    url: '',
    price: 0,
    snippet: '',
    description: '',
    accreditation: '',
    category: '',
    quantity: 0,
    order_productsId: 0,
    orderId: 0
  };
  @Input() cart: CartProduct[] = new Array();
  @Output() removeItemFromCart: EventEmitter < CartProduct > = new EventEmitter();
  currentCartStatus = false;
  titleText1 = 'See Product Description ->';

  constructor() {}

  removeItem(): void {
    this.removeItemFromCart.emit(this.product);
  }
}
