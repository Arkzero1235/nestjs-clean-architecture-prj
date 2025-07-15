import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateOrderDetailDto } from "lib/domain/dtos/order-detail/CreateOrderDetailDto";
import { UpdateOrderDetailDto } from "lib/domain/dtos/order-detail/UpdateOrderDetailDto";
import { OrderDetail } from "lib/domain/entities/OrderDetail.entity";
import { OrderDetailRepository } from "lib/domain/repositories/OrderDetailRepository";
import { OrderRepository } from "lib/domain/repositories/OrderRepository";

@Injectable()
export class OrderDetailUseCases {
    constructor(
        private readonly orderDetailRepository: OrderDetailRepository,
        private readonly orderRepository: OrderRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: Tao order detail
    async create(createOrderDetailDto: CreateOrderDetailDto) {
        // Validate data

        // Check existing orderId
        const existingOrder = await this.orderRepository.getById(createOrderDetailDto.orderId);

        // Log error
        if (!existingOrder) {
            this.logger.error("Cannot found order", undefined, "At create order detail usecase")
            throw new NotFoundException("Cannot found order")
        }

        // New instance
        const newInstance = OrderDetail.Create(createOrderDetailDto);

        // Create new order detail
        const createdOrderDetail = this.orderDetailRepository.persist(newInstance);

        // Log result
        this.logger.log("Create new order detail success", "At create order detail usecase")

        return createdOrderDetail;
    }

    // Usecase: Cap nhat order detail
    async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
        // Validate data

        // Check existing order detail
        const existingOrder = await this.orderDetailRepository.getById(id);

        // Log error
        if (!existingOrder) {
            this.logger.error("Cannot found order detail", undefined, "At update order detail usecase")
            throw new NotFoundException("Cannot found order detail")
        }

        // Update order detail
        const updatedOrderDetail = await this.orderDetailRepository.merge(id, updateOrderDetailDto);

        // Log result
        this.logger.log("Update order detail success", "At update order detail usecase")

        return updatedOrderDetail;
    }

    // Usecase: Xoa order detail
    async delete(id: string) {
        // Validate data

        // Check existing order detail
        const existingOrder = await this.orderDetailRepository.getById(id);

        // Log error
        if (!existingOrder) {
            this.logger.error("Cannot found order detail", undefined, "At delete order detail usecase")
            throw new NotFoundException("Cannot found order detail")
        }

        // Delete order detail
        const deletedOrderDetail = await this.orderDetailRepository.remove(id);

        // Log result
        this.logger.log("Delete order detail success", "At delete order detail usecase")

        return deletedOrderDetail;
    }
}