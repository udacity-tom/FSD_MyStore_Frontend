export class Product {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    category: string;

    constructor() {
        this.id = 1;
        this.name = '';
        this.url = '';
        this.price = 0;
        this.description = '';
        this.category = '';
    }
}