import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { OrderUseCases } from "lib/use-case/order/order.use-case";
import { CreateOrderReqDto } from "../dtos/order/CreateOrderReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateOrderReqDto } from "../dtos/order/UpdateOrderReqDto";
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

@Injectable()
@Controller("/order")
export class OrderController {
    constructor(
        private readonly orderUseCases: OrderUseCases,
        private readonly logger: Logger
    ) { }

    @Get("user/:userId")
    @ApiOperation({ summary: 'Lấy tất cả đơn hàng của một người dùng' })
    @ApiParam({
        name: 'userId',
        type: 'string',
        example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
        description: 'ID của người dùng cần lấy đơn hàng'
    })
    @ApiOkResponse({
        description: 'Danh sách đơn hàng của người dùng',
        schema: {
            example: {
                statusCode: 200,
                message: 'Get all orders of userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: [
                    {
                        id: 'ord-001',
                        userId: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
                        total: 1200000,
                        status: 'PENDING',
                        createdAt: '2025-07-12T10:00:00.000Z',
                        updatedAt: '2025-07-12T10:00:00.000Z'
                    },
                    {
                        id: 'ord-002',
                        userId: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
                        total: 850000,
                        status: 'COMPLETED',
                        createdAt: '2025-07-10T15:30:00.000Z',
                        updatedAt: '2025-07-11T12:45:00.000Z'
                    }
                ]
            }
        }
    })
    async find(@Param("userId") userId: string) {
        this.logger.log("Get all orders of user request received", "At order controller");
        const result = await this.orderUseCases.find(userId);
        return ApiResponseHelper.success(
            `Get all orders of userId ${userId} success`,
            result,
            200
        )
    }

    @Post()
    @ApiOperation({ summary: 'Tạo đơn hàng mới cho người dùng' })
    @ApiBody({
        description: 'Thông tin đơn hàng cần tạo',
        schema: {
            type: 'object',
            properties: {
                userId: {
                    type: 'string',
                    example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d'
                },
                status: {
                    type: 'string',
                    enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
                    example: 'PENDING'
                }
            },
            required: ['userId', 'status']
        }
    })
    @ApiOkResponse({
        description: 'Tạo đơn hàng thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Create order for userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: {
                    id: 'ord-001',
                    userId: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
                    status: 'PENDING',
                    total: 0,
                    createdAt: '2025-07-12T17:00:00.000Z'
                }
            }
        }
    })
    async create(@Body() createOrderReqDto: CreateOrderReqDto) {
        this.logger.log("Create order request received", "At order controller");
        const mappedData = ReqMapper.CreateOrderMapper(createOrderReqDto);
        const result = await this.orderUseCases.create(mappedData);
        return ApiResponseHelper.success(
            `Create order for userId ${createOrderReqDto.userId} success`,
            result,
            200
        )
    }

    @Patch()
    @ApiOperation({ summary: 'Cập nhật trạng thái đơn hàng' })
    @ApiBody({
        description: 'Thông tin đơn hàng cần cập nhật',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'ord-001'
                },
                userId: {
                    type: 'string',
                    example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d'
                },
                status: {
                    type: 'string',
                    enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
                    example: 'COMPLETED'
                }
            },
            required: ['id', 'userId', 'status']
        }
    })
    @ApiCreatedResponse({
        description: 'Cập nhật đơn hàng thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Update order status for userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: {
                    id: 'ord-001',
                    userId: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
                    status: 'COMPLETED',
                    total: 1200000,
                    createdAt: '2025-07-12T10:00:00.000Z',
                    updatedAt: '2025-07-12T19:00:00.000Z'
                }
            }
        }
    })
    async update(@Body() updateOrderReqDto: UpdateOrderReqDto) {
        this.logger.log("Update order request received", "At order controller");
        const mappedData = ReqMapper.UpdateOrderMapper(updateOrderReqDto);
        const result = await this.orderUseCases.update(mappedData);
        return ApiResponseHelper.success(
            `Update order status for userId ${updateOrderReqDto.userId} success`,
            result,
            201
        )
    }

    @Delete(":userId/:id")
    @ApiOperation({ summary: 'Xoá đơn hàng theo ID và userId' })
    @ApiParam({
        name: 'userId',
        type: 'string',
        example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
        description: 'ID người dùng sở hữu đơn hàng'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'ord-001',
        description: 'ID đơn hàng cần xoá'
    })
    @ApiOkResponse({
        description: 'Xoá đơn hàng thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Delete order ord-001 of userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: {
                    id: 'ord-001',
                    deleted: true
                }
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'Không tìm thấy đơn hàng hoặc không thuộc user này'
    })
    async remove(@Param("id") id: string, @Param("userId") userId: string) {
        this.logger.log("Delete order request received", "At order controller");
        const result = await this.orderUseCases.remove(id, userId);
        return ApiResponseHelper.success(
            `Delete order ${id} of userId ${userId} success`,
            result,
            200
        )
    }
}