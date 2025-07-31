import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrderDto } from "lib/domain/dtos/order/CreateOrderDto";
import { OrderDto } from "lib/domain/dtos/order/ResDto";
import { UpdateOrderDto } from "lib/domain/dtos/order/UpdateOrderDto";
import { OrderRepository } from "lib/domain/repositories/OrderRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll(): Promise<object[] | null> {
        try {
            const getted_order = await this.prismaService.order.findMany({
                include: {
                    details: {
                        include: {
                            product: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return getted_order;

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async persist(createOrderDto: CreateOrderDto): Promise<OrderDto | null> {
        try {
            const create_order_result = await this.prismaService.order.create({
                data: {
                    userId: createOrderDto.userId,
                    status: "PENDING",
                    total: 0,
                }
            })

            return ResMapper.mapResponseOrderDto(create_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async merge(id: string, status: string): Promise<OrderDto | null> {
        try {
            const update_order_result = await this.prismaService.order.update({
                where: {
                    id: id
                },
                data: {
                    status: status
                }
            })

            return ResMapper.mapResponseOrderDto(update_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async remove(id: string): Promise<OrderDto | null> {
        try {
            const delete_order_result = await this.prismaService.order.update({
                where: {
                    id: id
                },
                data: {
                    status: "CANCEL"
                }
            })

            return ResMapper.mapResponseOrderDto(delete_order_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getByIdWithDetails(orderId: string): Promise<OrderDto | null> {
        try {
            const order = await this.prismaService.order.findUnique({
                where: { id: orderId },
                include: {
                    details: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!order) return null;

            return order;

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getPendingOrder(userId: string): Promise<OrderDto | null> {
        try {
            const get_order_by_id_result = await this.prismaService.order.findFirst({
                where: {
                    userId: userId,
                    status: 'PENDING',
                },
                include: {
                    details: true,
                }
            })

            if (!get_order_by_id_result) return null;

            return get_order_by_id_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async find(userId: string): Promise<object | null> {
        try {
            const find_result = await this.prismaService.order.findMany({
                where: { userId },
                include: {
                    details: {
                        include: {
                            product: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return find_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getRevenuePerDay() {
        try {
            const result = await this.prismaService.$queryRawUnsafe(`
      SELECT 
        TO_CHAR("createdAt", 'YYYY-MM-DD') as date,
        SUM("total") as "totalRevenue"
      FROM "Order"
      WHERE status = 'SUCCESS'
      GROUP BY date
      ORDER BY date ASC;
    `);

            return result;
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async getDashboardStats() {
        try {
            const [
                totalProducts,
                totalUsers,
                totalCategories,
                totalSuccessfulOrders,
                totalCancelledOrders,
                totalSliders,
            ] = await Promise.all([
                this.prismaService.product.count(),
                this.prismaService.user.count(),
                this.prismaService.category.count(),
                this.prismaService.order.count({
                    where: {
                        status: 'SUCCESS',
                    },
                }),
                this.prismaService.order.count({
                    where: {
                        status: 'CANCEL',
                    },
                }),
                this.prismaService.slider.count(),
            ]);

            return {
                totalProducts,
                totalUsers,
                totalCategories,
                totalSuccessfulOrders,
                totalCancelledOrders,
                totalSliders,
            };
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }
}