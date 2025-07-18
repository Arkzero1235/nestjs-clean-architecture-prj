import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateOrderDetailDto } from "lib/domain/dtos/order-detail/CreateOrderDetailDto";
import { OrderDetailDto } from "lib/domain/dtos/order-detail/OrderDetailDto";
import { OrderDetailRepository } from "lib/domain/repositories/OrderDetailRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class OrderDetailRepositoryImpl implements OrderDetailRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async updateOrderTotal(orderId: string): Promise<void> {
        try {
            const details = await this.prismaService.orderDetail.findMany({
                where: { orderId },
                select: { total: true },
            });

            // Tính tổng tiền từ các chi tiết đơn hàng
            const total = details.reduce((sum, item) => sum + item.total, 0);

            // Cập nhật total cho bảng Order
            await this.prismaService.order.update({
                where: { id: orderId },
                data: { total },
            });
        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async persist(createOrderDetailDto: CreateOrderDetailDto, price: number, stock: number): Promise<OrderDetailDto | null> {
        try {
            const total = price * stock;
            const created_order_detail = await this.prismaService.orderDetail.create({
                data: {
                    orderId: createOrderDetailDto.orderId,
                    productId: createOrderDetailDto.productId,
                    quantity: createOrderDetailDto.quantity,
                    price,
                    total
                },
            });

            return created_order_detail;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async merge(id: string, quantity: number): Promise<OrderDetailDto | null> {
        try {
            const detail = await this.prismaService.orderDetail.findUnique({
                where: { id },
            });

            if (!detail) {
                throw new NotFoundException("Không tìm thấy chi tiết đơn hàng");
            }

            console.log(quantity);

            const newQuantity = quantity;
            const newTotal = detail.price * newQuantity;

            const updatedDetail = await this.prismaService.orderDetail.update({
                where: { id },
                data: {
                    quantity: newQuantity,
                    total: newTotal,
                },
            });

            const details = await this.prismaService.orderDetail.findMany({
                where: { orderId: detail.orderId },
                select: { total: true },
            });

            const orderTotal = details.reduce((sum, item) => sum + item.total, 0);

            await this.prismaService.order.update({
                where: { id: detail.orderId },
                data: { total: orderTotal },
            });

            return updatedDetail;
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    remove(id: string): Promise<OrderDetailDto | null> {
        throw new Error("Method not implemented.");
    }

    async get(orderId: string, productId: string): Promise<OrderDetailDto | null> {
        try {
            const find_result = await this.prismaService.orderDetail.findFirst({
                where: {
                    orderId: orderId,
                    productId: productId
                }
            })

            return find_result;
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    find(orderId: string, productId: string): Promise<OrderDetailDto[] | null> {
        throw new Error("Method not implemented.");
    }
}