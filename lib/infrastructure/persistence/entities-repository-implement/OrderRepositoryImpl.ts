import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrderDto } from "lib/domain/dtos/order/CreateOrderDto";
import { UpdateOrderDto } from "lib/domain/dtos/order/UpdateOrderDto";
import { OrderRepository } from "lib/domain/repositories/OrderRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async persist(createOrderDto: CreateOrderDto): Promise<object | null> {
        try {
            const create_order_result = await this.prismaService.order.create({
                data: {
                    userId: createOrderDto.userId,
                    status: createOrderDto.status,
                    total: 0,
                }
            })

            return ResMapper.mapResponseOrderDto(create_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async merge(updateOrderDto: UpdateOrderDto): Promise<object | null> {
        try {
            const update_order_result = await this.prismaService.order.update({
                where: {
                    id: updateOrderDto.id
                },
                data: {
                    status: updateOrderDto.status
                }
            })

            return ResMapper.mapResponseOrderDto(update_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async remove(id: string): Promise<object | null> {
        try {
            const delete_order_result = await this.prismaService.order.delete({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseOrderDto(delete_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async find(userId: string): Promise<object | null> {
        try {
            const all_order_result = await this.prismaService.order.findMany({
                where: {
                    userId: userId
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return ResMapper.mapResponseOrderDto(all_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getById(id: string): Promise<object | null> {
        try {
            const get_order_by_id_result = await this.prismaService.order.findUnique({
                where: {
                    id: id
                }
            })

            if (!get_order_by_id_result) return null;

            return ResMapper.mapResponseOrderDto(get_order_by_id_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }
}