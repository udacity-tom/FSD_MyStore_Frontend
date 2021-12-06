import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrdersService } from '../service/orders.service';


interface Cart_product extends Product {
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
  @Input() cart: Cart_product[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }


removeCartItem(quantity: number, orderId: number, productId: number, order_productId: number) {
  // console.log('Remove the item with Product ID of ', order_productId);
    this.ordersService.removeCartItem(quantity, orderId, productId, order_productId).subscribe(res => {
      const wasDeleted = res;
      if(wasDeleted){
        console.log('The item ',productId, order_productId,' was deleted!')
      }
      // this.router.navigate(['/cart']);
      // this.productsInActiveCart();
    })
}

}
