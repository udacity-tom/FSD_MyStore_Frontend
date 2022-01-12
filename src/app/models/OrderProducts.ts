export class OrderProducts {
    id: number; // order_products ID
    productid: number;
    quantity: number;
    orderid: number;

    constructor() {
        this.id = 0;
        this.productid = 0;
        this.quantity = 0;
        this.orderid = 0;
    }
}
