import { OrderStatus } from "lib/domain/enums/OrderStatus";

export class ResponseOrderDto {
    id: string;
    userId: string;
    total: string;
    status: OrderStatus;
}