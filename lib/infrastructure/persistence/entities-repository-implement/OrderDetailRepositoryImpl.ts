import { Injectable } from "@nestjs/common";
import { CreateOrderDetailDto } from "lib/domain/dtos/order-detail/CreateOrderDetailDto";
import { UpdateOrderDetailDto } from "lib/domain/dtos/order-detail/UpdateOrderDetailDto";
import { OrderDetailRepository } from "lib/domain/repositories/OrderDetailRepository";

@Injectable()
export class OrderDetailRepositoryImpl implements OrderDetailRepository {
    persist(createOrderDetailDto: CreateOrderDetailDto): Promise<object | null> {
        throw new Error("Method not implemented.");
    }
    merge(updateOrderDetailDto: UpdateOrderDetailDto): Promise<object | null> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<object | null> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<object | null> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<object | null> {
        throw new Error("Method not implemented.");
    }

}