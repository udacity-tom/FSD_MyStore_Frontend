import { Component, Input, OnInit} from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';
import { LoginService } from 'src/app/service/login.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'Our List Of Prouducts';
  products: Product[] = [];
  activeOrder: number = 0;
  loginStatus = false;
  pid = 0;
  quantity = 0;
  response: object = {};

  constructor(private productService: ProductService, private loginService: LoginService, private orderService: OrdersService, private toastService: ToastService ) { }

  ngOnInit(): void {
    this.getActiveOrder();
    setTimeout(() => {
      this.loginService.loginStatus().subscribe(status => {
        this.loginStatus = status;
      })
      this.productService.getProducts().subscribe(res => {
        this.products = res;
      });
       }, 100);
  }

  addProductToCart(item: {pid:number, quantity:number}) {
    this.getActiveOrder();
    this.orderService.addProductToActiveOrder(item.pid, item.quantity, this.activeOrder).subscribe(res => {
      this.response = res;
      const productIndex = item.pid-1;
      this.toastService.show(`Add to Cart: ${this.products[productIndex].name} (${item.quantity})`, `We have put ${item.quantity} piece${(item.quantity > 1 ? 's' : '')} of the product '${this.products[productIndex].name}' into your Cart!` );
    })
  }

  getActiveOrder() {
    this.orderService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
    });
  }

}
