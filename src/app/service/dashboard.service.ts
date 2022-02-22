import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL: string = environment.PROTOCOL + environment.API_SERVER_IP + ':' + environment.API_PORT;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };
  topFive = '';

  constructor(private http: HttpClient) { }

  topFiveProducts(): Observable<object[]> {
    const request =  this.http.get<object[]> (`${this.baseURL}/products/info/top-5-products`);
    console.log('dashboard service request', request);
    return request;
  }
}
