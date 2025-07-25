import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { OrderUseCases } from "lib/use-case/order/order.use-case";
import { CreateOrderReqDto } from "../dtos/order/CreateOrderReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateOrderReqDto } from "../dtos/order/UpdateOrderReqDto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller("/order")
export class OrderController {
    constructor(
        private readonly orderUseCases: OrderUseCases,
        private readonly logger: Logger
    ) { }

    @Roles(["ADMIN"])
    @Get("/revenue")
    @ApiOperation({
        summary: "Lấy doanh thu theo tuần - ADMIN"
    })
    async revenue() {
        this.logger.log("Get revenue request received", "At order controller");

        const result = await this.orderUseCases.revenue();

        return ApiResponseHelper.success(
            `Get revenue success`,
            result,
            200
        )
    }

    @Roles(["ADMIN"])
    @Get("/sum")
    @ApiOperation({
        summary: "Lấy tổng số lượng DB - ADMIN"
    })
    async sum() {
        this.logger.log("Get sum db request received", "At order controller");

        const result = await this.orderUseCases.sumData();

        return ApiResponseHelper.success(
            `Get sum db success`,
            result,
            200
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Get("/:userId")
    @ApiOperation({
        summary: "Lấy tất cả giỏ hàng của 1 người dùng - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
        example: '2d011518-d44f-4957-975c-54fdf88f28a8',
        description: 'id của người dùng'
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

    @Roles(["CLIENT"])
    @Post()
    @ApiOperation({
        summary: "Tạo / Cập nhật (số lượng 1 loại sản phẩm) của 1 giỏ hàng cho người dùng - CLIENT"
    })
    @ApiBody({
        type: CreateOrderReqDto
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

    @Roles(["ADMIN", "CLIENT"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật trạng thái đơn hàng thành công - CLIENT - ADMIN",
        description: "Trạng thái (status) của đơn hàng được đặt là SUCCESS khi người dùng (hoặc admin) nhấn xác nhận đã nhận được hàng và thanh toán thành công"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của giỏ hàng cần cập nhật'
    })
    @ApiBody({
        type: UpdateOrderReqDto
    })
    async update(@Param("id") id: string) {
        this.logger.log("Update order request received", "At order controller");
        const result = await this.orderUseCases.update(id);
        return ApiResponseHelper.success(
            `Update order status for id ${id} success`,
            result,
            201
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Delete(":userId/:id")
    @ApiOperation({
        summary: "Cập nhật trạng thái đơn hàng bị hủy (Soft Delete) - CLIENT - ADMIN",
        description: "Trạng thái (status) của đơn hàng được đặt là CANCEL khi người dùng hoặc admin hủy đơn hàng hoặc có sự cố trong quá trình vận chuyển"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của người dùng cần xóa'
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