import { CreateOrderDto } from "../dtos/order/CreateOrderDto";
import { OrderDto } from "../dtos/order/ResDto";
import { UpdateOrderDto } from "../dtos/order/UpdateOrderDto";

export abstract class OrderRepository {
    abstract persist(createOrderDto: CreateOrderDto): Promise<OrderDto | null>;
    abstract merge(updateOrderDto: UpdateOrderDto): Promise<OrderDto | null>;
    abstract remove(id: string): Promise<OrderDto | null>;
    abstract find(userId: string): Promise<OrderDto | null>;
    abstract getById(id: string): Promise<OrderDto | null>;
}