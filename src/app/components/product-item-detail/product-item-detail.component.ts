import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() products: Product[] = [];
  product: Product;
  givenId: number;
  noOfItems: number;
  itemDescription: object;
  response: object = {};

  constructor(
    private productService:ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService
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
    this.itemDescription = {};
  }
  
  async ngOnInit(): Promise<void> {
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.givenId).subscribe(res => {
      this.product = res;
    });
  }

  increaseItems(): void {
    this.noOfItems++
  }

  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems--
  }
  addProductsToCart(pid: number, quantity: number){
    // console.log('product ', pid, ' added to order. Quantity is ', quantity)
    // this.cartService.addProductToActiveOrder(pid, quantity);
    this.cartService.addProductToActiveOrder(pid, quantity).subscribe(res => {
      this.response = res;
      console.log('add product to cart res',res);
    })
  }

}

