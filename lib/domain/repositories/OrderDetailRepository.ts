import { CreateOrderDetailDto } from "../dtos/order-detail/CreateOrderDetailDto";
import { OrderDetailDto } from "../dtos/order-detail/OrderDetailDto";

export abstract class OrderDetailRepository {
    abstract updateOrderTotal(orderId: string): Promise<void>
    abstract persist(createOrderDetailDto: CreateOrderDetailDto, price: number, total: number): Promise<OrderDetailDto | null>;
    abstract merge(id: string, quantity: number): Promise<OrderDetailDto | null>;
    abstract remove(id: string): Promise<OrderDetailDto | null>;
    abstract get(orderId: string, productId: string): Promise<OrderDetailDto | null>;
    abstract getById(orderId: string): Promise<OrderDetailDto | null>;
    abstract find(orderId: string, productId: string): Promise<OrderDetailDto[] | null>;
}