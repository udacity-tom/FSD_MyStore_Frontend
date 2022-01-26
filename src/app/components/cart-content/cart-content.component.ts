import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChange,
  SimpleChanges
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

  ngOnChanges(): void {
    this.cart = []
  }

  removeItem(): void {
    console.log('cart-content comp, this.product', this.product);
    this.removeItemFromCart.emit(this.product);
    
    setTimeout(() => {
      // location.reload();
      window.location.reload();
      this.ngOnInit();
    }, 100);
    setTimeout(() => {
      this.toastService.show(`${this.product.name} was removed from the cart`, `The product ${this.product.name} was removed from the cart.`)
    },250);
  }

}
