export class Order_products {
    id: number; //order_products ID
    product_id: number;
    quantity: number;
    order_id: number;

    constructor() {
        this.id = 0;
        this.product_id = 0;
        this.quantity = 0;
        this.order_id = 0;
    }
}