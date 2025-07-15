import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateOrderDetailDto } from "lib/domain/dtos/order-detail/CreateOrderDetailDto";
import { OrderDetailDto } from "lib/domain/dtos/order-detail/ResDto";
import { UpdateOrderDetailDto } from "lib/domain/dtos/order-detail/UpdateOrderDetailDto";
import { OrderDetailRepository } from "lib/domain/repositories/OrderDetailRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class OrderDetailRepositoryImpl implements OrderDetailRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async updateOrderTotal(orderId: string): Promise<void> {
        // Get all orderdetails of this orderId
        const details = await this.prismaService.orderDetail.findMany({
            where: { orderId },
            select: { total: true }
        });

        // Calculate sum total
        const total = details.reduce((sum, item) => sum + item.total, 0);

        // Update Order.total
        await this.prismaService.order.update({
            where: { id: orderId },
            data: { total }
        });
    }

    async persist(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetailDto | null> {
        try {

            // Create new orderdetail
            const create_result = await this.prismaService.orderDetail.create({
                data: {
                    orderId: createOrderDetailDto.orderId,
                    productId: createOrderDetailDto.productId,
                    quantity: createOrderDetailDto.quantity,
                    price: createOrderDetailDto.price,
                    status: createOrderDetailDto.status || "",
                    total: createOrderDetailDto.quantity * createOrderDetailDto.price || 0,
                }
            })

            // Update order.total
            await this.updateOrderTotal(create_result.orderId);

            return ResMapper.mapResponseOrderDetailDto(create_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async merge(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetailDto | null> {
        try {
            // Get current data
            const existing = await this.prismaService.orderDetail.findUnique({
                where: { id: id },
            });

            if (!existing) {
                throw new NotFoundException("Order detail not found");
            }

            // Update data
            const quantity = updateOrderDetailDto.quantity ?? existing.quantity;
            const price = updateOrderDetailDto.price ?? existing.price;
            const status = updateOrderDetailDto.status ?? existing.status;

            const data: any = {
                quantity,
                price,
                status,
                total: quantity * price // update total
            };

            // Update order detail
            const update_result = await this.prismaService.orderDetail.update({
                where: { id: id },
                data
            });

            // Update order.total
            await this.updateOrderTotal(existing.orderId);

            return ResMapper.mapResponseOrderDetailDto(update_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async remove(id: string): Promise<OrderDetailDto | null> {
        try {
            const delete_result = await this.prismaService.orderDetail.delete({
                where: {
                    id: id
                }
            })

            await this.updateOrderTotal(delete_result.orderId);

            return ResMapper.mapResponseOrderDetailDto(delete_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async find(orderId: string): Promise<OrderDetailDto[] | null> {
        try {
            const all_order_details = await this.prismaService.orderDetail.findMany({
                where: { orderId },
                include: {
                    product: true
                }
            });

            return ResMapper.mapResponseOrderDetailDtoList(all_order_details);
        }
        catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getById(id: string): Promise<OrderDetailDto | null> {
        try {
            const getted_result = await this.prismaService.orderDetail.findUnique({
                where: { id },
                include: {
                    product: true
                }
            })

            return ResMapper.mapResponseOrderDetailDto(getted_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

}