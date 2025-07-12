import { OrderStatus } from "lib/domain/enums/OrderStatus";

export class OrderStatusMapper {
    static map(status: string): OrderStatus {
        const toUpperCase = status.toUpperCase();

        switch (toUpperCase) {
            case "PENDING": return OrderStatus.pending;
            case "CANCEL": return OrderStatus.cancel;
            case "SUCCESS": return OrderStatus.success;
            default: throw new Error(`Unknow order status ${status}`);
        }
    }
}