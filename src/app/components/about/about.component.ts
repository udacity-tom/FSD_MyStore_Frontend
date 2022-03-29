import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';

interface PopularProduct extends Product {
  sum: number;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  products: PopularProduct[] = [];
  constructor(
    private dashboardService: DashboardService,
    private productsService: ProductService
    ) {
    }

  ngOnInit(): void {
    this.topProducts();
  }

  topProducts(): void {
    this.products = [];
    this.dashboardService.topFiveProducts().subscribe( topFive => {
      topFive.forEach(item => {
        const productidValue = Object.values(item)[0]; // productId
        const sumValue = Object.values(item)[1]; // total sold-sumvalue from postgres
        this.productsService.getProduct(productidValue).subscribe(product => {
          this.products.push(Object.assign(product, {sum: sumValue}));
        });
      });
      this.products.sort( (a, b) => b.sum - a.sum);
    });
  }
}
