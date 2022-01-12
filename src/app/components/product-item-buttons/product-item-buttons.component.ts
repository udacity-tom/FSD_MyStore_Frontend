import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';
import {
  Product
} from 'src/app/models/Product';
import {
  CartService
} from 'src/app/service/cart.service';
import {
  LoginService
} from 'src/app/service/login.service';
import {
  OrdersService
} from 'src/app/service/orders.service';

@Component({
  selector: 'app-product-item-buttons',
  templateUrl: './product-item-buttons.component.html',
  styleUrls: ['./product-item-buttons.component.css']
})
export class ProductItemButtonsComponent implements OnInit {
  @Input() product: Product;
  @Output() addProductToCart: EventEmitter < object > = new EventEmitter();

  showCss = false;
  pid = 0;
  response: object = {};
  quantity = 1;
  activeOrder = 0;
  item: {
    pid: number,
    quantity: number
  } = {
    pid: 0,
    quantity: 0
  };
  loginStatus = true;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private loginService: LoginService) {
    this.product = {
      id: 0,
      name: '',
      url: '',
      price: 0,
      snippet: '',
      description: '',
      accreditation: '',
      category: ''
    };
  }

  ngOnInit(): void {
    // this.loginService.loginStatus().subscribe(res => {
    //   this.loginStatus = res;
    // });
    console.log('product-item-buttons loginStatus', this.loginStatus);
  }

  addProduct(): void {
    this.item = {
      pid: this.product.id,
      quantity: 1
    };
    console.log('product-item-buttons addproductotcart, item', this.item);
    this.addProductToCart.emit(this.product);

  }
  // addProductToCart(pid: number, quantity: number ){
  //   const item = {pid, quantity};
  //   console.log("product-item-detail addproductotcart")
  //   this.addProductsToCart.emit(item);

  // }
  // addProductsToCart(pid: number, quantity: number){
  //   console.log('product ', pid, ' added to order. Quantity is ', quantity, 'activeOrder number', this.activeOrder);
  //   this.orderService.currentActiveOrder().subscribe(res => {
  //     this.activeOrder = res;
  //   })
  //   this.cartService.addProductToActiveOrder(pid, quantity, this.activeOrder).subscribe(res => {
  //     this.response = res;
  //     console.log('product-list add to cart res', res);
  //   })
  // }
}
