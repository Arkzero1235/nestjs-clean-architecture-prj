import { OrderStatus } from "lib/domain/enums/OrderStatus";

export class UpdateOrderDto {
    id: string;
    userId: string;
    status: OrderStatus;
}