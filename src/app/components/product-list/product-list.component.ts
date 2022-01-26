import { Component, Input, OnInit} from '@angular/core';
import { ProductService } from 'src/app/service/products.service';
import { Product } from 'src/app/models/Product';
import { LoginService } from 'src/app/service/login.service';
import { OrdersService } from 'src/app/service/orders.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'Product List component';
  // @Input() 
  products: Product[] = [];
  @Input() activeOrder: number = 0;
  pid = 0;
  quantity = 0;
  response: object = {};
  // activeOrder = 0;
  loginStatus = false;

  constructor(private productService: ProductService, private loginService: LoginService, private orderService: OrdersService ) { }

  ngOnInit(): void {
    this.getActiveOrder();
    // this.orderService.activeOrder().subscribe(res => {
    //   this.activeOrder = res.id;
    //   console.log('product-list, this.activeOrder, res', this.activeOrder, res);
    // })
    if(this.activeOrder === 0){

    }

    setTimeout(() => {
      this.loginService.loginStatus().subscribe(status => {
        this.loginStatus = status;
      })
      this.productService.getProducts().subscribe(res => {
        this.products = res;
      });
       }, 70);
    
    console.log('product-list comp this.loginStatus, this.activeOrder', this.loginStatus, this.activeOrder);
  }




  // addProductsToCart(item: {pid:number, quantity:number}) {
  //   console.log('product-list compont, item', item);
  //   this.getActiveOrder();
  //   this.cartService.addProductToActiveOrder(item.pid, item.quantity, this.activeOrder).subscribe(res => {
  //     this.response = res;
  //     console.log('product-item component, add product to cart res =',res);
  //   })
  // }

  getActiveOrder() {
    this.orderService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
      console.log('product-list, this.activeOrder, res', this.activeOrder, res);
    });
  }

}
