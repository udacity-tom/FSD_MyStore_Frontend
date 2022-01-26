import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() loginStatus: boolean;
  @Input() activeOrder: number;
  showButtons = false;
  showCss = false;
  value = false;
  response: object = {};

  // activeOrder = 0;
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

  constructor(private orderService: OrdersService, private toastService: ToastService, private route: ActivatedRoute, private router: Router) {
    this.activeOrder = 0;
    this.loginStatus = false;
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
  }
  routeTo(): void {
    this.router.navigate(['detail/'+this.product.id], {relativeTo: this.route});
  }

  addProductToCart(product: Product, quantity: number): void {
    this.orderService.addProductToActiveOrder(product.id, 1, this.activeOrder).subscribe(res => {
      this.response = res;
      this.toastService.show(`Add to Cart: ${this.product.name} x ${quantity}`, `We have put ${quantity} piece${(quantity > 1 ? 's' : '')} of the product '${this.product.name}' into your Cart!` )
    });
  }
}
