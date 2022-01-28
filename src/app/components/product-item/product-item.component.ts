import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
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
  @Output() addProductToCart: EventEmitter<{pid: number, quantity: number}> = new EventEmitter;
  showButtons = false;
  response: object = {};
  item: {pid: number, quantity: number} = {pid:0, quantity:0};

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

  addProductsToCart(pid: number, quantity: number): void {
    this.item = {pid:pid, quantity:quantity};
    this.addProductToCart.emit({pid:pid, quantity:quantity});
  }

  getClass(): object {
    return {
      'loggedin': this.loginStatus
    }
  }
}
