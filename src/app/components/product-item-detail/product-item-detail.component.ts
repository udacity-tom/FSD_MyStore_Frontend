import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrdersService } from 'src/app/service/orders.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() yes: EventEmitter<any> = new EventEmitter();
  // @Output() addProductsToCart: EventEmitter<object> = new EventEmitter();
  product: Product;
  givenId: number;
  noOfItems: number;
  itemDescription: object;
  response: object = {};
  activeOrder: number = 0;
  state: string = 'child';

  constructor(
    private productService:ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrdersService
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
    // this.activeOrder = this.orderService.currentActiveOrder().subscribe(res => {return Number(res)});

  }
  
  async ngOnInit(): Promise<void> {
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.givenId).subscribe(res => {
      this.product = res;
    });
    this.orderService.currentActiveOrder().subscribe(res => {
      this.activeOrder = res;
      console.log('product-item-detail, this.activeOrder, res', this.activeOrder, res);
    });

  }

  increaseItems(): void {
    this.noOfItems++
  }

  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems--
  }

  


  addProductToCart(pid: number, quantity: number ){
    const item = {pid, quantity};
    console.log("product-item-detail addproductotcart", item);
    
    // this.addProductToCart.emit(item);


    //Cghange this to an emitter to push the changes up to product list 
    //In this way there is only one call to the addProductToActiveOrder funciton for both product-detail and proudct list


    console.log('product ', pid, ' added to order. Quantity is ', quantity)
    // this.cartService.addProductToActiveOrder(pid, quantity);
    this.cartService.addProductToActiveOrder(pid, quantity, this.activeOrder).subscribe(res => {
      this.response = res;
      console.log('product-list-item component, add product to cart res =',res);
    })
  }

}

