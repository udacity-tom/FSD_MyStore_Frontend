import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators'
// import { next } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  // @Input() products: Product[] = [];
  @Input() products: Product[] = [];
  // @Input() productToView: Product = {};
  // @Input() product: Product;
  // productDetail:
  product: Product;
  givenId: number;
  noOfItems: number = 1;
  filter$!: Observable<string>;

  constructor(private productService:ProductService, private route: ActivatedRoute) { 
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

    // this.productToView = {
    //   id: 0,
    //   name: '',
    //   url: '',
    //   price: 0,
    //   snippet: '',
    //   description: '',
    //   accreditation: '',
    //   category: ''
    // };
    
    this.givenId = 0;
  }
  
  ngOnInit(): void {
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().pipe(first()).subscribe(res => {
      this.products = res;
      // console.log("this.products from product-item-detail.component", this.products);
    })
    
    setTimeout(() =>
    {
      this.product = this.products.filter( item => {
      if(item.id != Number(this.givenId)){
        return;
      } else {
        return item;
      }
    })[0];
    
  }, 250);
  }

  increaseItems(): void {
    this.noOfItems +=1
  }

  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems -=1
  }
}
