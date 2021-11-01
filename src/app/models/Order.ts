export class Order {
    id: number;
    user_id: number;
    status: string;

    constructor() {
        this.id = 0;
        this.user_id = 0;
        this.status = '';
    }
}