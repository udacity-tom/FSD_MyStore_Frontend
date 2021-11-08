import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    this.givenId = 0;
    this.noOfItems = 1;
    this.itemDescription = {};
  }
  
  async ngOnInit(): Promise<void> {
    this.givenId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.givenId).subscribe(res => {
      this.product = res;
    //   this.productService.getDescription(this.product.description, this.product.name).subscribe(res => {
    //     this.itemDescription = res;
    //   console.log("this.itemDescription product-item-detail", this.itemDescription);
    // })
    });
  }

  increaseItems(): void {
    this.noOfItems +=1
  }

  decreaseItems() {
    if(this.noOfItems==1) return;
    this.noOfItems -=1
  }
}
