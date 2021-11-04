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
        this.id = 1;
        this.name = '';
        this.url = '';
        this.price = 0;
        this.snippet = '';
        this.description = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&formatversion=2&exsentences=3&explaintext=1&titles=${this.name}`;
        this.accreditation = '';
        this.category = '';
    }

    // getDescription(searchTerm: string) {
    //     return `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&formatversion=2&exsentences=3&explaintext=1&titles=${searchTerm}`;
    // }
}