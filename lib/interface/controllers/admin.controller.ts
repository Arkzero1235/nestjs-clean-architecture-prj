import { Body, Controller, Delete, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { AdminUsecases } from "lib/use-case/admin/admin.use-case";
import { CreateAdminReqDto } from "../dtos/admin/CreateAdminReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Injectable()
@Controller("/admin")
export class AdminController {
    constructor(
        private readonly adminUseCases: AdminUsecases,
        private readonly logger: Logger
    ) { }

    @Post()
    @ApiOperation({ summary: "Tạo tài khoản admin" })
    @ApiBody({
        description: 'Thông tin để tạo admin',
        required: true,
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Nguyen Van A' },
                email: { type: 'string', example: 'admin@example.com' },
                password: { type: 'string', example: '123456' },
                phone: { type: 'string', example: '0123456789' },
            },
            required: ['name', 'email', 'password', 'phone'],
        }
    })
    @ApiCreatedResponse({
        description: 'Thông tin admin được tạo',
        schema: {
            example: {
                id: 'abc123',
                name: 'Nguyen Van A',
                email: 'admin@example.com',
                password: 'hashed_password',
                phone: '0123456789',
            }
        }
    })
    async create(@Body() createAdminReqDto: CreateAdminReqDto) {
        this.logger.log("Create admin request received", "At admin controller");
        const mappedData = ReqMapper.CreateAdminMapper(createAdminReqDto);
        const result = await this.adminUseCases.Create(mappedData);
        return ApiResponseHelper.success(
            "Create admin success",
            result,
            201
        )
    }

    @ApiOperation({ summary: "Cập nhật thông tin admin theo ID" })
    @ApiBody({
        description: 'Thông tin admin cần cập nhật',
        required: true,
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Nguyen Van B' },
                email: { type: 'string', example: 'admin2@example.com' },
                password: { type: 'string', example: 'newpassword123' },
                phone: { type: 'string', example: '0987654321' },
            },
            required: [],
        },
    })
    @ApiOkResponse({
        description: 'Cập nhật admin thành công',
        schema: {
            example: {
                id: 'a1b2c3d4',
                name: 'Nguyen Van B',
                email: 'admin2@example.com',
                phone: '0987654321',
            },
        },
    })
    @Patch("/:id")
    async Update(@Body() updateAdminReqDto: UpdateAdminReqDto, @Param("id") id: string) {
        this.logger.log("Update admin request received", "At admin controller");
        const mappedData = ReqMapper.UpdateAdminMapper(updateAdminReqDto);
        const result = await this.adminUseCases.Update(id, mappedData);
        return ApiResponseHelper.success(
            "Update admin success",
            result,
            200
        )
    }

    @Delete("/:id")
    @ApiOperation({ summary: 'Xoá admin theo ID' })
    @ApiOkResponse({
        description: 'Xoá admin thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Delete admin success',
                data: {
                    id: 'a1b2c3d4',
                    name: 'Nguyen Van A',
                    email: 'admin@example.com',
                    phone: '0123456789',
                },
            },
        },
    })
    async Remove(@Param("id") id: string) {
        this.logger.log("Delete admin request received", "At admin controller");
        const result = await this.adminUseCases.Delete(id);
        return ApiResponseHelper.success(
            "Delete admin success",
            result,
            200
        )
    }
}