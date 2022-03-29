import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/products.service';
import { Router } from '@angular/router';

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
    private productsService: ProductService,
    private router: Router
    ) {
    }

  ngOnInit(): void {
    this.topProducts();
  }

  topProducts(): void {
    this.products = [];
    this.dashboardService.topFiveProducts().subscribe(res => {
      res.forEach(item => {
        const productidValue = Object.values(item)[0];
        const sumValue = Object.values(item)[1];
        this.productsService.getProduct(productidValue).subscribe(res => {
          this.products.push(res);
          this.products[this.products.length-1].sum = sumValue;
          this.products.sort( (a, b) => b.sum - a.sum); 
        });
      });
    });
  }
}
