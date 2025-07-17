import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateOrderDetailDto } from "lib/domain/dtos/order-detail/CreateOrderDetailDto";
import { CreateOrderDto } from "lib/domain/dtos/order/CreateOrderDto";
import { UpdateOrderDto } from "lib/domain/dtos/order/UpdateOrderDto";
import { Order } from "lib/domain/entities/Order.entity";
import { OrderDetail } from "lib/domain/entities/OrderDetail.entity";
import { OrderDetailRepository } from "lib/domain/repositories/OrderDetailRepository";
import { OrderRepository } from "lib/domain/repositories/OrderRepository";
import { ProductRepository } from "lib/domain/repositories/ProductRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";

@Injectable()
export class OrderUseCases {
    this: any;
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly orderDetailRepository: OrderDetailRepository,
        private readonly productRepository: ProductRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: them order theo userId
    async create(createOrderDto: CreateOrderDto) {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(createOrderDto.userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot find user", undefined, "At create order usecase");
            throw new NotFoundException("Cannot found user to create order");
        }

        // Check existing PENDING status order 
        let order: any;

        order = await this.orderRepository.getPendingOrder(createOrderDto.userId);

        // Log error & create new order if there is no PENDING status order
        if (!order) {
            this.logger.error(`There is no available order for userId ${createOrderDto.userId}`, undefined, "At create order usecase");

            // New instance
            const newInstance = Order.Create(createOrderDto);

            // Create new order
            order = await this.orderRepository.persist(newInstance);
        }

        // Check existing product
        const existingProduct = await this.productRepository.getById(createOrderDto.productId);

        // Log error
        if (!existingProduct) {
            this.logger.error(`There is no available productId ${createOrderDto.productId}`, undefined, "At create order usecase");
            throw new NotFoundException("Cannot found product");
        }

        // Check existing product in order detail
        const existingOrderDetail = await this.orderDetailRepository.get(order.id, createOrderDto.productId);

        if (existingOrderDetail) {
            // Check product storage
            const newQuantity = createOrderDto.quantity + existingOrderDetail.quantity;

            const isEnoughStock = existingProduct.storage >= newQuantity;

            if (!isEnoughStock) {
                this.logger.error("Not enough products to add to order", undefined, "At create order usecase");
                throw new BadRequestException("Not enough products to add to order");
            }

            await this.orderDetailRepository.merge(existingOrderDetail.id, newQuantity);

            // Update product storage
            await this.productRepository.updateStorage(createOrderDto.productId, createOrderDto.quantity);

            // Log
            this.logger.log(`Updated quantity for order detail with id ${existingOrderDetail.id} success`, "At create order usecase");

        } else {
            // Check product storage
            const isEnoughStock = existingProduct.storage >= createOrderDto.quantity;

            if (!isEnoughStock) {
                this.logger.error("Not enough products to add to order", undefined, "At create order usecase");
                throw new BadRequestException("Not enough products to add to order.");
            }

            // Create new order detail
            const orderDetailDto: CreateOrderDetailDto = {
                orderId: order.id,
                productId: createOrderDto.productId,
                quantity: createOrderDto.quantity
            };

            const newODInstance = OrderDetail.Create(orderDetailDto);
            await this.orderDetailRepository.persist(newODInstance, existingProduct.price, existingProduct.stock);

            // Update product storage
            await this.productRepository.updateStorage(createOrderDto.productId, createOrderDto.quantity)

            this.logger.log(`Created new order detail for order ${order.id} successfully`, "At create order usecase");
        }

        // Update total in order
        await this.orderDetailRepository.updateOrderTotal(order.id);

        // Log result
        this.logger.log(`Create new order and order details for userId ${createOrderDto.userId} success`, "At create order usecase");

        // Get all order details in order
        const all_order_details = await this.orderRepository.getByIdWithDetails(order.id);

        return all_order_details;
    }

    // Usecase: cap nhat trang thai order cua userId
    async update(updateOrderDto: UpdateOrderDto) {
        // // Validate data

        // // Check existing user
        // const existingUser = await this.userRepository.getById(updateOrderDto.userId);

        // // Log error
        // if (!existingUser) {
        //     this.logger.error("Cannot found user", undefined, "At update order status usecase");
        //     throw new NotFoundException("Cannot found user to update order status");
        // }

        // // Check existing order
        // const existingOrder = await this.orderRepository.getById(updateOrderDto.id)

        // // Log error
        // if (!existingOrder) {
        //     this.logger.error("Cannot found order", undefined, "At update order status usecase");
        //     throw new NotFoundException("Cannot found order to update order status");
        // }

        // // Update status
        // const updatedOrder = await this.orderRepository.merge(updateOrderDto);

        // // Log result
        // this.logger.log(`Update order status for userId ${updateOrderDto.userId} success`, "At update order status usecase");

        // return updatedOrder;
    }

    // Usecase: xoa order cua userId
    async remove(id: string, userId: string) {
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
    async find(userId: string) {
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