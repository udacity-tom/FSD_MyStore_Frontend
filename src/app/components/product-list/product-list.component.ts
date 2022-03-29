import { Component, OnInit} from '@angular/core';
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
  title = 'Our List Of Products';
  products: Product[] = [];
  activeOrder = 0;
  loginStatus = false;

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private ordersService: OrdersService,
    private toastService: ToastService
    )
    { }

  ngOnInit(): void {
    this.getActiveOrder();
    setTimeout(() => {
      this.loginService.loginStatus().subscribe(status => {
        this.loginStatus = status;
      });
      this.productService.getProducts().subscribe(res => {
        this.products = res;
      });
       }, 100);
  }

  addProductToCart(item: {pid: number, quantity: number}): void {
    this.ordersService.addProductToActiveOrder(item.pid, item.quantity, this.activeOrder).subscribe(res => {
      if (
        item.pid === Number(Object.values(res)[1]) // product id
        && this.activeOrder === Number(Object.values(res)[3]) ) { // active order id
      const productIndex = item.pid - 1;
      this.toastService.show(`Add to Cart: ${this.products[productIndex].name}`, `We have put ${item.quantity} piece${(item.quantity > 1 ? 's' : '')} of the product '${this.products[productIndex].name}' into your Cart!` );
    }
      this.getActiveOrder();
    });
  }

  getActiveOrder(): void {
    this.ordersService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
      this.ordersService.countCartItems(res.id);
    });
  }

}
