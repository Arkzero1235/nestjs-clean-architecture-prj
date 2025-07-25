import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryUseCases } from "lib/use-case/category/category.use-case";
import { CreateCategoryReqDto } from "../dtos/category/CreateCategoryReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateCategoryReqDto } from "../dtos/category/UpdateCategoryReqDto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CategoryResDto } from "../dtos/category/CategoryResDto";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller("/category")
export class CategoryController {
    constructor(
        private readonly categoryUseCases: CategoryUseCases,
        private readonly logger: Logger
    ) { }

    @Roles(["ADMIN"])
    @Post()
    @ApiOperation({
        summary: "Tạo 1 danh mục - ADMIN"
    })
    @ApiBody({
        type: CreateCategoryReqDto
    })
    @ApiCreatedResponse({
        description: "Create a category success",
        type: CategoryResDto
    })
    async create(@Body() createCategoryReqDto: CreateCategoryReqDto) {
        this.logger.log("Create category request received", "At category controller");
        const mappedData = ReqMapper.CreateCategoryMapper(createCategoryReqDto);
        const result = await this.categoryUseCases.create(mappedData);
        return ApiResponseHelper.success(
            "Create category success",
            result,
            201
        )
    }

    @Roles(["ADMIN"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật 1 danh mục - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '40135726-5b8e-4795-a256-6f49424e8e01',
        description: 'id của danh mục cần cập nhật'
    })
    @ApiBody({
        type: UpdateCategoryReqDto
    })
    @ApiOkResponse({
        description: "Update category success",
        type: CategoryResDto
    })
    async update(@Body() updateCategoryReqDto: UpdateCategoryReqDto, @Param("id") id: string) {
        this.logger.log("Update category request received", "At category controller");
        const mappedData = ReqMapper.UpdateCategoryMapper(updateCategoryReqDto);
        const result = await this.categoryUseCases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update category success",
            result,
            200
        )
    }

    @Roles(["ADMIN"])
    @Delete("/:id")
    @ApiOperation({
        summary: "Xóa danh mục theo id - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '40135726-5b8e-4795-a256-6f49424e8e01',
        description: 'id của danh mục cần xóa'
    })
    @ApiOkResponse({
        description: "Delete category by id success",
        type: CategoryResDto
    })
    async remove(@Param("id") id: string) {
        this.logger.log("Delete category request received", "At category controller");
        const result = await this.categoryUseCases.remove(id);
        return ApiResponseHelper.success(
            "Delete category success [WARNING: ALL PRODUCT DATAS OF THIS CATEGORY HAVE BEEN LOST]",
            result,
            200
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Get()
    @ApiOperation({
        summary: "Lấy tất cả danh mục - CLIENT - ADMIN"
    })
    @ApiOkResponse({
        description: "Get all categories success",
        type: CategoryResDto
    })
    async find() {
        this.logger.log("Get all categories request received", "At category controller");
        const result = await this.categoryUseCases.find();
        return ApiResponseHelper.success(
            "Get all categories success",
            result,
            200
        )
    }
}