import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UserUseCases } from "lib/use-case/user/user.use-case";
import { UpdateUserReqDto } from "lib/interface/dtos/user/UpdateUserReqDto";
import { CreateUerReqDto } from "../dtos/user/CreateUserReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UserResDto } from "../dtos/user/UserResDto";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller('/user')
export class UserController {
    constructor(
        private userUseCases: UserUseCases,
        private readonly logger: Logger
    ) { }

    @Roles(["ADMIN"])
    @Get()
    @ApiOperation({
        summary: "Lấy danh sách tài khoản người dùng - ADMIN"
    })
    @ApiOkResponse({
        description: "Get all users success",
        type: UserResDto,
        isArray: true
    })
    async getAll() {
        this.logger.log("Get all users request received", "At user controller");

        const result = await this.userUseCases.getAllUser();

        return ApiResponseHelper.success(
            "Get all users",
            result,
            200
        )
    }

    // GET /user/by-email?email=abc@example.com
    @Roles(["ADMIN"])
    @Get('/by-email')
    @ApiOperation({
        summary: "Lấy tài khoản người dùng theo email - ADMIN"
    })
    @ApiQuery({
        name: 'email',
        type: String,
        required: true,
        example: 'buixuandung309@gmail.com',
        description: 'Email của người dùng cần tìm'
    })
    @ApiOkResponse({
        description: "Get user by email success",
        type: UserResDto
    })
    async getByEmail(@Query('email') email: string) {
        this.logger.log("Get user by email request received", "At user controller");

        const result = await this.userUseCases.getByEmail(email);

        return ApiResponseHelper.success(
            "Get user by email success",
            result,
            200
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Get(':userId')
    @ApiOperation({
        summary: "Lấy tài khoản người dùng theo id - ADMIN"
    })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
        example: '23965667-5e9a-4c43-9836-8d196a5c6c6f',
        description: 'id của người dùng cần tìm'
    })
    @ApiOkResponse({
        description: "Get user by id success",
        type: UserResDto
    })
    async getById(@Param('userId') userId: string) {
        this.logger.log("Get user by id request received", "At user controller");

        const result = await this.userUseCases.getById(userId);

        return ApiResponseHelper.success(
            "Get user by id success",
            result,
            200
        )
    }

    @Roles(["ADMIN"])
    @Post()
    @ApiOperation({
        summary: "Tạo 1 tài khoản người dùng - CLIENT - ADMIN"
    })
    @ApiBody({
        type: CreateUerReqDto
    })
    @ApiCreatedResponse({
        description: "Create new user success",
        type: UserResDto
    })
    async create(@Body() create_user: CreateUerReqDto) {
        this.logger.log("Create user request received", "At user controller");

        const mapData = ReqMapper.CreateUserMapper(create_user); // map req data -> use case data
        const result = await this.userUseCases.createUser(mapData);

        return ApiResponseHelper.success(
            "Create new user success",
            result,
            201
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Patch(':userId')
    @ApiOperation({
        summary: "Cập nhật 1 tài khoản người dùng - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của người dùng cần cập nhật'
    })
    @ApiBody({
        type: UpdateUserReqDto
    })
    @ApiOkResponse({
        description: "Update user success",
        type: UserResDto
    })
    async update(
        @Param('userId') userId: string,
        @Body() updateUserDto: UpdateUserReqDto) {
        this.logger.log("Update user request received", "At user controller");

        const result = await this.userUseCases.updateUser(userId, updateUserDto);

        return ApiResponseHelper.success(
            "Update user success",
            result,
            201
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Delete(':userId')
    @ApiOperation({
        summary: "Xóa tài khoản người dùng theo id - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
        example: '3327cd87-5740-4ff0-a79f-aaec52656ecb',
        description: 'id của người dùng cần xóa'
    })
    @ApiOkResponse({
        description: "Delete user by id success",
        type: UserResDto
    })
    async remove(@Param('userId') userId: string) {
        this.logger.log("Delete user request received", "At user controller");

        const result = await this.userUseCases.removeUser(userId);

        return ApiResponseHelper.success(
            "Delete user by id success",
            result,
            201
        )
    }
}
