import { CreateOrderDto } from "../dtos/order/CreateOrderDto";
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

    static Create(data: CreateOrderDto) {
        // Validate data

        return data;
    }
}