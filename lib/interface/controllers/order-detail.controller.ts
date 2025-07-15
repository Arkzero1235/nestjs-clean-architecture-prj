import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { OrderDetailUseCases } from "lib/use-case/order-detail/order-detail.use-case";
import { CreateOrderDetailReqDto } from "../dtos/order-detail/CreateOrderDetailReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateOrderDetailReqDto } from "../dtos/order-detail/UpdateOrderDetailReqDto";

@Injectable()
@Controller("/order-detail")
export class OrderDetailController {
    constructor(
        private readonly orderDetailUsecases: OrderDetailUseCases,
        private readonly logger: Logger
    ) { }

    @Post()
    async create(@Body() createOrderDetailReqDto: CreateOrderDetailReqDto) {
        this.logger.log("Create order detail request received", "At order detail controller");
        const mappedData = ReqMapper.CreateOrderDetailMapper(createOrderDetailReqDto);
        const result = await this.orderDetailUsecases.create(mappedData);
        return ApiResponseHelper.success(
            "Create new order detail success",
            result,
            201
        )
    }

    @Patch("/:id")
    async update(
        @Param("id") id: string,
        @Body() updateOrderDetailReqDto: UpdateOrderDetailReqDto
    ) {
        this.logger.log("Update order detail request received", "At order detail controller");
        const mappedData = ReqMapper.UpdateOrderDetailMapper(updateOrderDetailReqDto);
        const result = await this.orderDetailUsecases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update order detail success",
            result,
            200
        )
    }

    @Delete("/:id")
    async remove(@Param("id") id: string) {
        this.logger.log("Delete order detail request received", "At order detail controller");
        const result = await this.orderDetailUsecases.delete(id);
        return ApiResponseHelper.success(
            "Delete order detail success",
            result,
            200
        )
    }

    @Get("/:orderId")
    async find(@Param("orderId") orderId: string) {
        this.logger.log("Get a;; order details request received", "At order detail controller");
        const result = await this.find(orderId);
        return ApiResponseHelper.success(
            "Get all order details success",
            result,
            200
        )
    }
}