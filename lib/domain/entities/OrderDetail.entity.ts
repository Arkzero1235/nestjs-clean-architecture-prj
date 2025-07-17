import { CreateOrderDetailDto } from "../dtos/order-detail/CreateOrderDetailDto";

export class OrderDetail {
    private id: string;
    private orderId: string;
    private productId: string;
    private quantity: number;
    private price: number;

    getId(): string {
        return this.id;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }

    static Create(data: CreateOrderDetailDto) {
        // Validate data

        return data;
    }
}