import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrdersService } from 'src/app/service/orders.service';


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
  @Input() product: Cart_product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '', quantity: 0, order_productsId: 0, orderId: 0 };
  // @Input() product: Product;
  @Output() removeItemFromCart: EventEmitter<Cart_product> = new EventEmitter();
  
  
  // product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

  }

  removeItem() {
    this.removeItemFromCart.emit(this.product);
    location.reload();
  }

//   removeItemFromCart(quantity: number, orderId: number, productId: number, order_productId: number) {
//   // console.log('Remove the item with Product ID of ', order_productId);
//     this.ordersService.removeCartItem(quantity, orderId, productId, order_productId).subscribe(res => {
//       const wasDeleted = res;
//       if(wasDeleted){
//         console.log('The item ',productId, order_productId,' was deleted!')
//       }
//       // this.router.navigate(['/cart']);
//       // this.productsInActiveCart();
//     })
// }

}