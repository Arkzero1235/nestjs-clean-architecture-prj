import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { OrderUseCases } from "lib/use-case/order/order.use-case";
import { CreateOrderReqDto } from "../dtos/order/CreateOrderReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateOrderReqDto } from "../dtos/order/UpdateOrderReqDto";

@Injectable()
@Controller("/order")
export class OrderController {
    constructor(
        private readonly orderUseCases: OrderUseCases,
        private readonly logger: Logger
    ) { }

    @Get("user/:userId")
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