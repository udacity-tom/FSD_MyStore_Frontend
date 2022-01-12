import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import {
  Product
} from 'src/app/models/Product';
import {
  OrdersService
} from 'src/app/service/orders.service';


interface CartProduct extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
})
export class CartContentComponent implements OnInit {
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
  // @Input() product: Product;
  @Input() cart: CartProduct[] = [];
  @Output() removeItemFromCart: EventEmitter < CartProduct > = new EventEmitter();
  currentCartStatus = false;

  // product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // if(this.cart.length != 0) {
    //   this.currentCartStatus = true;
    // }
    // console.log('Cart-content component, currentCartStatus', this.currentCartStatus);
    // console.log('cart-content component the value of cart is', this.cart, this.cart.length);
  }

  // ngOnChanges(): void {

  // }

  removeItem(): void {
    this.removeItemFromCart.emit(this.product);
    setTimeout(() => {
      location.reload();
    }, 100);
    // location.reload();
  }

}
