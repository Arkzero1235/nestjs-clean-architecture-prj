export class CreateOrderDetailDto {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    status?: string;
    total: number;
}