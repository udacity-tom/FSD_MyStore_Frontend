import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  topFiveProduct: {productid: number, sum: number} = {productid: 0, sum: 0};
  topFiveProducts: [{productid: number, sum: number}] = [{productid: 0, sum: 0}];
  baseURL: string = environment.PROTOCOL + environment.API_SERVER_IP + ':' + environment.API_PORT;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };
  topFive: {productid: 0, sum: 0}[] = [];
  products: PopularProduct[] = [];
  constructor(private dashboardService: DashboardService, private productsService: ProductService) { }

  ngOnInit(): void {
    this.topProducts();
  }

  topProducts(): void {
    this.products = [];
    this.dashboardService.topFiveProducts().subscribe(res => {
      res.forEach(item => {
        // console.log('item details', item);
        const productidValue = Object.values(item)[0]
        const sumValue = Object.values(item)[1]
        this.productsService.getProduct(productidValue).subscribe(res => {
          this.products.push(res);
          this.products[this.products.length-1].sum = sumValue;
        })
      })
      // this.topFive.forEach(item => {
      //   console.log('topfive item', item);
      // })
      // console.log('this.topFive[0]', this.topFive[0]);
      // console.log('about comp, topfive', res, this.topFiveProducts, this.topFive, this.products);
    });
  }

}
