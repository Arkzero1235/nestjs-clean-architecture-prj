import { OrderStatus } from "lib/domain/enums/OrderStatus";

export class CreateOrderDto {
    userId: string;
    status: OrderStatus;
}