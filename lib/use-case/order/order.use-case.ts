import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "lib/domain/dtos/order/CreateOrderDto";
import { UpdateOrderDto } from "lib/domain/dtos/order/UpdateOrderDto";
import { Order } from "lib/domain/entities/Order.entity";
import { OrderRepository } from "lib/domain/repositories/OrderRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";

@Injectable()
export class OrderUseCases {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: them order theo userId
    async create(createOrderDto: CreateOrderDto): Promise<object | null> {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(createOrderDto.userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found user", undefined, "At create order usecase");
            throw new NotFoundException("Cannot found user to create order");
        }

        // New instance
        const newInstance = Order.Create(createOrderDto);

        // Create new order
        const createdOrder = await this.orderRepository.persist(newInstance);

        // Log result
        this.logger.log(`Create new comment for userId ${createOrderDto.userId} success`, "At create order usecase");

        return createdOrder;
    }

    // Usecase: cap nhat trang thai order cua userId
    async update(updateOrderDto: UpdateOrderDto): Promise<object | null> {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(updateOrderDto.userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found user", undefined, "At update order status usecase");
            throw new NotFoundException("Cannot found user to update order status");
        }

        // Check existing order
        const existingOrder = await this.orderRepository.getById(updateOrderDto.id)

        // Log error
        if (!existingOrder) {
            this.logger.error("Cannot found order", undefined, "At update order status usecase");
            throw new NotFoundException("Cannot found order to update order status");
        }

        // Update status
        const updatedOrder = await this.orderRepository.merge(updateOrderDto);

        // Log result
        this.logger.log(`Update order status for userId ${updateOrderDto.userId} success`, "At update order status usecase");

        return updatedOrder;
    }

    // Usecase: xoa order cua userId
    async remove(id: string, userId: string): Promise<object | null> {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found user", undefined, "At delete order usecase");
            throw new NotFoundException("Cannot found user to delete order");
        }

        // Update status
        const deletedOrder = await this.orderRepository.remove(id);

        // Log result
        this.logger.log(`Delete order for userId ${userId} success`, "At delete order usecase");

        return deletedOrder;
    }

    // Usecase: lay tat ca orders theo userId
    async find(userId: string): Promise<object | null> {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found user", undefined, "At get all orders of user usecase");
            throw new NotFoundException("Cannot found user to get orders");
        }

        // Get orders
        const gettedOrders = await this.orderRepository.find(userId);

        // Log result
        this.logger.log(`Get all orders for userId ${userId} success`, "At get all orders of user usecase");

        return gettedOrders;
    }
}