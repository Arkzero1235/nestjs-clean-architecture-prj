import { CreateOrderDetailDto } from "../dtos/order-detail/CreateOrderDetailDto";

export class OrderDetail {
    private id: string;
    private orderId: string;
    private productId: string;
    private quantity: number;
    private price: number;
    private status: string;

    getId(): string {
        return this.id;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }

    static Create(data: CreateOrderDetailDto) {
        // Validate data

        return data;
    }
}