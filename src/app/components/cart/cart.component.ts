import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Order_products } from 'src/app/models/Order_products';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { TokenService } from 'src/app/service/token.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ProductService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import { of } from 'rxjs';
// import { CartService }

interface Cart_product extends Product {
  quantity: number;
  order_productsId: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: Cart_product[] = [];  //products in cart
  @Output() removeItemFromCart: EventEmitter<Product> = new EventEmitter;
  cartTotal: number = 0.00;


  currentOrder: Order = {id: 0, user_id: 0, status: ''}; //The DB order where status ='active'
  @Input() cartOrder: Order = {id: 0, user_id: 0, status: ''}; //the current user cart to update to DB onChange
  allOrders: Order[] = []; //all user orders on DB
  orderProducts: Order_products[] = [{id: 0, product_id: 0, quantity: 0, order_id: 0}];//order transactions
  product: Product = {id: 0, name: '', url: '', price: 0, snippet:'', description: '', accreditation: '', category: '' };
  loginStatus: boolean = false;
  username: string = '';
  addedCartItem: number = 0;

  constructor(
    private loginService: LoginService, 
    private tokenService: TokenService, 
    private router: Router,
    private ordersService: OrdersService,
    private productService: ProductService,
    private cartService: CartService
     ) { }

  ngOnInit(): void {
    //check if user is logged in, if yes update cart with active order
    this.updateLoginStatus()
    if(this.loginStatus){
      this.userOrders();//get all orders on system for user
    }
  }
  
  onChanges() {
    // if(this.loginStatus){
    //   this.userOrders();//get all orders on system for user
    // }
    //update the cart with changes: adding products, removing products, checkout, etc...if necessary
  }

  updateLoginStatus(): void {
    this.loginService.loginStatus().subscribe(res => {
      this.loginStatus = res;
      if(!this.loginStatus){
        console.log('logged-in component re-route page, this.loginStatus is ', this.loginStatus);
        // this.router.navigate(['/', {relativeTo: this.route}]);
        // this.router.navigate(['/']);
        return;
      }
      this.tokenService.getToken().subscribe(res => {
        this.username = res.user;
      })
    });
  }

  userOrders(): void {
    this.ordersService.getOrders().subscribe(res => {
      // console.log('res', res);
      this.allOrders = res;
      this.activeOrder(res);
    });
  }
  


  activeOrder(allOrders: Order[]):void {
    const justOne =  allOrders.filter(order => {  
      return order.status == 'active';
    });
    this.currentOrder = justOne[0];//takes just one 'activ' order from array, array->item
    // console.log('this.currentOrder, this.allOrders', this.currentOrder, 'this.currentOrder.id', this.currentOrder.id,  this.allOrders);
    this.productsInActiveOrder();
  }
  
  
  productsInActiveOrder() { //gets the products in the active order
    this.ordersService.orderDetails(this.currentOrder.id).subscribe(res => {
      // console.log('res in proudctsInActiveOrder', res);
      this.orderProducts = res;
      this.productsInActiveCart();
    })
  }
  
  //NOTES add a for-loop to iterate over items, and add each this.orderProducts[id].quantity and to 
  // add in order_products id into the interface extenstion, then we know which line to delete.
  productsInActiveCart(): void {
    console.log('productsinactiveCart, this.orderProducts', this.orderProducts);
    this.orderProducts.forEach(item => {
      // console.log('item in productsInActiveCart', item);
      this.productService.getProduct(item.product_id).subscribe(res => {
        // Number(this.orderQuantity(item.));
        // res = Object.assign(res, {quantity: this.orderProducts[0].quantity});//TO-DO fix this!!!!!!!!!
        res = Object.assign(res, {quantity: item.quantity, order_productsId: item.id});//TO-DO fix this!!!!!!!!!!!!!!!!
        console.log('res after quantity and order_products.id', res);
        // console.log('res of adding quantity', res)
        // console.log('this.orderQuantity(item.product_id)', this.orderProducts[0].quantity);
        this.cartTotal += Number((res.price*Number(res.quantity)).toFixed(2));
        // this.cart.push(res);
        // console.log('this.orderProducts[0].quantity', this.orderProducts[0].quantity);
        // res: Product = of(res):Cart_product;
        // console.log('productsInactivecart', res);
        this.cart.push(res);
      });
    });
  }
      
  // addProductsToActiveOrder(){
  //   this.cartService.addProductService().subscribe(res => {
  //     this.currentOrder
  //     // console.log('product ', pid, ' added to order')
  //   })
  // }

  removeCartItem(pid: number) {
    console.log('Remove the item with Product ID of ', pid);

  }
}


// }
