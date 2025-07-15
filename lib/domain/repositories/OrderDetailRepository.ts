import { CreateOrderDetailDto } from "../dtos/order-detail/CreateOrderDetailDto";
import { OrderDetailDto } from "../dtos/order-detail/ResDto";
import { UpdateOrderDetailDto } from "../dtos/order-detail/UpdateOrderDetailDto";

export abstract class OrderDetailRepository {
    abstract updateOrderTotal(orderId: string): Promise<void>
    abstract persist(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetailDto | null>;
    abstract merge(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetailDto | null>;
    abstract remove(id: string): Promise<OrderDetailDto | null>;
    abstract find(orderId: string): Promise<OrderDetailDto[] | null>;
    abstract getById(id: string): Promise<OrderDetailDto | null>;
}