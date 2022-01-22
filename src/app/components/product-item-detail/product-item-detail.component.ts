import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() yes: EventEmitter<any> = new EventEmitter();
  // @Output() addProductsToCart: EventEmitter<object> = new EventEmitter();
  @Input() loginStatus = false;
  product: Product;
  givenId: number;
  noOfItems: number;
  itemDescription: object;
  response: object = {};
  activeOrder = 0;
  state = 'child';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrdersService,
    private loginService: LoginService,
    private toastService: ToastService
    ) {
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
    this.givenId = 0;
    this.noOfItems = 1;
    this.itemDescription = {};
  }

  async ngOnInit(): Promise<void> {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
    });
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.givenId).subscribe(res => {
      this.product = res;
    });
    console.log('subscribing to the current activeorder() function from orderService');
    this.orderService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
      console.log('product-item-detail, this.activeOrder, res', this.activeOrder, res);
    });

  }

  increaseItems(): void {
    this.noOfItems++;
  }

  decreaseItems(): void {
    if (this.noOfItems === 1) { return; }
    this.noOfItems--;
  }

  addProductToCart(pid: number, quantity: number ): void{
    const item = {pid, quantity};
    this.orderService.addProductToActiveOrder(pid, quantity, this.activeOrder).subscribe(res => {
      this.response = res;
      this.toastService.show(this.product.name, `We have put ${quantity} piece${(quantity > 1 ? 's' : '')} of the product '${this.product.name}' into your Cart!` )
    });
  }

}

