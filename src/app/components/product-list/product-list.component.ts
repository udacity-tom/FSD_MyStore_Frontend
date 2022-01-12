import { Component, Input, OnInit} from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'Product List component';
  @Input() products: Product[] = [];
  pid = 0;
  quantity = 0;
  response: object = {};
  activeOrder = 0;

  constructor(private productService: ProductService, private cartService: CartService, private orderService: OrdersService) { }

  ngOnInit(): void {
    // raw data return for setting up View, move to backend later
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  // addProductsToCart(item: {pid:number, quantity:number}) {
  //   console.log('product-list compont, item', item);
  //   this.getActiveOrder();
  //   this.cartService.addProductToActiveOrder(item.pid, item.quantity, this.activeOrder).subscribe(res => {
  //     this.response = res;
  //     console.log('product-item component, add product to cart res =',res);
  //   })
  // }

  // getActiveOrder() {
  //   this.orderService.currentActiveOrder().subscribe(res => {
  //     this.activeOrder = res;
  //     console.log('product-item-detail, this.activeOrder, res', this.activeOrder, res);
  //   });
  // }

}
