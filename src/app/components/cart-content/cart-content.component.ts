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
  ToastService 
} from 'src/app/service/toast.service';

interface CartProduct extends Product {
  quantity: number;
  order_productsId: number;
  orderId: number;
}

@Component({
  selector: '[app-cart-content]',
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
  @Output() removeItemFromCart: EventEmitter < CartProduct > = new EventEmitter;
  currentCartStatus = false;
  titleText1 = 'See Product Description ->';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
  }

  removeItem(): void {
    this.removeItemFromCart.emit(this.product);
  }
}
