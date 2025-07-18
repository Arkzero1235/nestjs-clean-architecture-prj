import { Body, Controller, Delete, Injectable, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AdminUsecases } from "lib/use-case/admin/admin.use-case";
import { CreateAdminReqDto } from "../dtos/admin/CreateAdminReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { CreateAdminDto } from "lib/domain/dtos/admin/CreateAdminDto";
import { AdminResDto } from "../dtos/admin/AdminResDto";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller("/admin")
export class AdminController {
    constructor(
        private readonly adminUseCases: AdminUsecases,
        private readonly logger: Logger
    ) { }

    @Roles(["ADMIN"])
    @Post()
    @ApiOperation({
        summary: "Tạo 1 tài khoản admin - ADMIN"
    })
    @ApiBody({
        type: CreateAdminReqDto
    })
    @ApiCreatedResponse({
        description: "Create admin success",
        type: AdminResDto
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

    @Roles(["ADMIN"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật 1 tài khoản admin - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của admin cần cập nhật'
    })
    @ApiBody({
        type: UpdateAdminReqDto
    })
    @ApiOkResponse({
        description: "Update admin success",
        type: AdminResDto
    })
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

    @Roles(["ADMIN"])
    @Delete("/:id")
    @ApiOperation({
        summary: "Xóa 1 tài khoản admin - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của admin cần xóa'
    })
    @ApiOkResponse({
        description: "Delete admin success",
        type: AdminResDto
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