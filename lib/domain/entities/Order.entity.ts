import { OrderStatus } from "../enums/OrderStatus";

export class Order {
    private id: string;
    private status: OrderStatus;

    getId(): string {
        return this.id;
    }

    getStatus(): string {
        return this.status;
    }

    static Create(data: {
        status: string;
    }) {
        // Validate data

        return data;
    }
}