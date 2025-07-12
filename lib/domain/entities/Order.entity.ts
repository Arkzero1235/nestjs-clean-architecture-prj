import { CreateOrderDto } from "../dtos/order/CreateOrderDto";
import { OrderStatus } from "../enums/OrderStatus";

export class Order {
    private id: string;
    private readonly userId: string;
    private total: number;
    private status: OrderStatus;

    getId(): string {
        return this.id;
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): number {
        return this.total;
    }

    static Create(data: CreateOrderDto) {
        // Validate data

        return data;
    }
}