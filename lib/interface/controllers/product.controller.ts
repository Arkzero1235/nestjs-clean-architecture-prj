import { Body, Controller, Delete, Get, Injectable, Logger, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductUseCases } from "lib/use-case/product/product.use-case";
import { CreateProductReqDto } from "../dtos/product/CreateProductReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateProductReqDto } from "../dtos/product/UpdateProductReqDto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@ApiBearerAuth()
@Controller("/product")
export class ProductController {
    constructor(
        private readonly productUseCases: ProductUseCases,
        private readonly logger: Logger
    ) { }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Post()
    @ApiOperation({
        summary: "Tạo mới 1 sản phẩm - ADMIN"
    })
    @ApiBody({
        type: CreateProductReqDto
    })
    async create(@Body() createProductReqDto: CreateProductReqDto) {
        this.logger.log("Create product request received", "At product controller");
        const mappedData = ReqMapper.CreateProductMapper(createProductReqDto);
        const result = await this.productUseCases.create(mappedData);
        return ApiResponseHelper.success(
            "Create product success",
            result,
            201
        )
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật 1 sản phẩm hiện có - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của sản phẩm cần cập nhật'
    })
    @ApiBody({
        type: UpdateProductReqDto
    })
    async update(@Body() updateProductReqDto: UpdateProductReqDto, @Param("id") id: string) {
        this.logger.log("Update product request received", "At product controller");
        const mappedData = ReqMapper.UpdateProductMapper(updateProductReqDto);
        const result = await this.productUseCases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update product success",
            result,
            200
        )
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Delete("/:id")
    @ApiOperation({
        summary: "Xóa 1 sản phẩm theo id - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của sản phẩm cần xóa'
    })
    async remove(@Param("id") id: string) {
        this.logger.log("Delete product request received", "At product controller");
        const result = await this.productUseCases.remove(id);
        return ApiResponseHelper.success(
            "Delete product success",
            result,
            200
        )
    }

    @Get("/:id")
    @ApiOperation({
        summary: "Lấy tất cả sản phẩm có trong db theo id - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '5bc5c0c2-c134-473a-b6da-9546521104b5',
        description: 'id của sản phẩm cần tìm sản phẩm'
    })
    async findById(@Param("id", new ParseUUIDPipe()) id: string) {
        this.logger.log("Get product by id request received", "At product controller");
        const result = await this.productUseCases.findById(id);
        return ApiResponseHelper.success(
            "Get product by id success",
            result,
            200
        )
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN", "CLIENT"])
    @Get("/:categoryId")
    @ApiOperation({
        summary: "Lấy tất cả sản phẩm có trong db theo danh mục - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'categoryId',
        type: String,
        required: true,
        example: '5bc5c0c2-c134-473a-b6da-9546521104b5',
        description: 'id của danh mục cần tìm sản phẩm'
    })
    async findByCategory(@Param("categoryId", new ParseUUIDPipe()) categoryId: string) {
        this.logger.log("Get all products by category request received", "At product controller");
        const result = await this.productUseCases.findByCategory(categoryId);
        return ApiResponseHelper.success(
            "Get all products by category success",
            result,
            200
        )
    }

    @Get()
    @ApiOperation({
        summary: "Lấy tất cả sản phẩm có trong db - CLIENT - ADMIN"
    })
    async find() {
        this.logger.log("Get all products request received", "At product controller");
        const result = await this.productUseCases.find();
        return ApiResponseHelper.success(
            "Get all products success",
            result,
            200
        )
    }
}