import { OrderStatus } from "lib/domain/enums/OrderStatus";

export class OrderStatusMapper {
    static map(status: string): OrderStatus {
        const toUpperCase = status.toUpperCase();

        switch (toUpperCase) {
            case "PENDING": return OrderStatus.pending;
            case "IN PROCESS": return OrderStatus.inProcess;
            case "ON DELIVERY": return OrderStatus.onDelivery;
            case "CANCEL": return OrderStatus.cancel;
            case "SUCCESS": return OrderStatus.success;
            default: throw new Error(`Unknow order status ${status}`);
        }
    }
}