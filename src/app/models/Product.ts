export class Product {
    id: number;
    name: string;
    price: number;
    url: string;
    snippet: string;
    description: string;
    accreditation: string;
    category: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.url = '';
        this.price = 0;
        this.snippet = '';
        this.description = '';
        this.accreditation = '';
        this.category = '';
    }
}
