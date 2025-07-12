import { CreateOrderDto } from "../dtos/order/CreateOrderDto";
import { UpdateOrderDto } from "../dtos/order/UpdateOrderDto";

export abstract class OrderRepository {
    abstract persist(createOrderDto: CreateOrderDto): Promise<object | null>;
    abstract merge(updateOrderDto: UpdateOrderDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract find(userId: string): Promise<object | null>;
    abstract getById(id: string): Promise<object | null>;
}