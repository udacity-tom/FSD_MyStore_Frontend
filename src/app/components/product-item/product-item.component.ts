import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  // @Output() product: Product;
  // noOfItems: number = 1;
  showButtons = false;
  showCss = false;
  value = false;
  response: object = {};

  // response: object = {};
  activeOrder = 0;
  // item: {pid:number, quantity:number} = {
  //   pid: 0,
  //   quantity: 0
  // };

  mouseEnter(div: string): void{
    this.value = true;
  }
  mouseLeave(div: string): void {
    this.value = false;
  }

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
    };
  }

  ngOnInit(): void {
    this.getActiveOrder();
    // this.orderService.currentActiveOrder().subscribe(res => {
    //   this.activeOrder = res;
    //   console.log('product-item-detail, this.activeOrder, res', this.activeOrder, res);
    // });
  }

  addProductToCart(product: Product): void {
    console.log('product-list compont, item', product);
    this.getActiveOrder();
    this.orderService.addProductToActiveOrder(product.id, 1, this.activeOrder).subscribe(res => {
      this.response = res;
      console.log('product-item component, add product to cart res =', res);
    });
  }

  getActiveOrder(): void {
    this.orderService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
      console.log('product-item, this.activeOrder, res', this.activeOrder, res);
    });
  }
}
