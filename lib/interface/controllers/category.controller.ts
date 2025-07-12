import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { CategoryUseCases } from "lib/use-case/category/category.use-case";
import { CreateCategoryReqDto } from "../dtos/category/CreateCategoryReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateCategoryReqDto } from "../dtos/category/UpdateCategoryReqDto";
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@Injectable()
@Controller("/category")
export class CategoryController {
    constructor(
        private readonly categoryUseCases: CategoryUseCases,
        private readonly logger: Logger
    ) { }

    @Post()
    @ApiOperation({ summary: 'Tạo mới danh mục' })
    @ApiBody({
        description: 'Dữ liệu danh mục cần tạo',
        required: true,
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Thời trang',
                },
            },
            required: ['name'],
        },
    })
    @ApiCreatedResponse({
        description: 'Tạo danh mục thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Create category success',
                data: {
                    id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
                    name: 'Thời trang',
                    createdAt: '2025-07-12T17:25:00.000Z',
                    updatedAt: '2025-07-12T17:25:00.000Z',
                },
            },
        },
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

    @Patch("/:id")
    @ApiOperation({ summary: 'Cập nhật danh mục theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        description: 'ID danh mục cần cập nhật'
    })
    @ApiBody({
        description: 'Thông tin cần cập nhật cho danh mục',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Phụ kiện thời trang' }
            }
        }
    })
    @ApiOkResponse({
        description: 'Cập nhật danh mục thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Update category success',
                data: {
                    id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
                    name: 'Phụ kiện thời trang',
                    createdAt: '2025-07-12T17:25:00.000Z',
                    updatedAt: '2025-07-12T18:45:00.000Z'
                }
            }
        }
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

    @Delete("/:id")
    @ApiOperation({
        summary: 'Xoá danh mục theo ID',
        description:
            '⚠️ Khi xoá danh mục, tất cả dữ liệu sản phẩm liên quan sẽ bị xoá theo.'
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'b7f6e1c0-9abc-4d8a-92cd-2a0f1e31b912',
        description: 'ID của danh mục cần xoá'
    })
    @ApiOkResponse({
        description: 'Xoá danh mục thành công',
        schema: {
            example: {
                statusCode: 200,
                message:
                    'Delete category success [WARNING: ALL PRODUCT DATAS OF THIS CATEGORY HAVE BEEN LOST]',
                data: {
                    id: 'b7f6e1c0-9abc-4d8a-92cd-2a0f1e31b912',
                    deleted: true
                }
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'Không tìm thấy danh mục theo ID'
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

    @Get()
    @ApiOperation({ summary: 'Lấy tất cả danh mục' })
    @ApiOkResponse({
        description: 'Lấy danh sách danh mục thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Get all categories success',
                data: [
                    {
                        id: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
                        name: 'Thời trang',
                        createdAt: '2025-07-12T17:25:00.000Z',
                        updatedAt: '2025-07-12T18:45:00.000Z'
                    },
                    {
                        id: 'b7f6e1c0-9abc-4d8a-92cd-2a0f1e31b912',
                        name: 'Phụ kiện',
                        createdAt: '2025-07-10T14:10:00.000Z',
                        updatedAt: '2025-07-11T10:30:00.000Z'
                    }
                ]
            }
        }
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