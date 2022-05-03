import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/service/orders.service';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  loginStatus = false;
  product: Product;
  givenId: number;
  noOfItems: number;
  response: object = {};
  activeOrder = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
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
  }

  async ngOnInit(): Promise<void> {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
    });
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.givenId).subscribe(res => {
      this.product = res;
    });
    this.ordersService.activeOrder().subscribe(res => {
      this.activeOrder = res.id;
    });
  }

  increaseItems(): void {
    this.noOfItems++;
  }

  decreaseItems(): void {
    if (this.noOfItems === 1 || this.noOfItems <= 1) {
      this.noOfItems = 1
      return; }
    this.noOfItems--;
  }

  checkQuantity(value: number): void {
    if (value === null || String(value) === ''){ return;}
    if (isNaN(value) || Number(value) < 1) {
      this.noOfItems = 1;
      alert('No of Items ordered MUST be a number greater than 0!');
    }
  }

  addProductToCart(pid: number, quantity: number ): void{
    if (isNaN(quantity) || String(quantity) === '' ){ return; }
    this.ordersService.addProductToActiveOrder(pid, quantity, this.activeOrder).subscribe(res => {
      this.response = res;
      this.toastService.show(`Add to Cart: ${this.product.name}`, `We have put ${quantity} piece${(quantity > 1 ? 's' : '')} of the product '${this.product.name}' into your Cart!` );
      this.ordersService.countCartItems(this.activeOrder);
    });
  }
}
