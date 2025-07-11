import { CreateOrderDetailDto } from "../dtos/order-detail/CreateOrderDetailDto";
import { UpdateOrderDetailDto } from "../dtos/order-detail/UpdateOrderDetailDto";

export abstract class OrderDetailRepository {
    abstract persist(createOrderDetailDto: CreateOrderDetailDto): Promise<object | null>;
    abstract merge(updateOrderDetailDto: UpdateOrderDetailDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract find(): Promise<object | null>;
    abstract getById(id: string): Promise<object | null>;
}