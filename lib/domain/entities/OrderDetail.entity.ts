export class OrderDetail {
    private id: string;
    private quantity: number;
    private price: number;
    private status: string;
    private total: number;

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
        return this.total;
    }

    static Create(data: {
        quantity: number;
        price: number;
        status?: string;
        total: number;
    }) {
        // Validate data

        return data;
    }
}