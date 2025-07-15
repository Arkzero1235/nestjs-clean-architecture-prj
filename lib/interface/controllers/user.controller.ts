import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from "@nestjs/common";
import { UserUseCases } from "lib/use-case/user/user.use-case";
import { UpdateUserReqDto } from "lib/interface/dtos/user/UpdateUserReqDto";
import { CreateUerReqDto } from "../dtos/user/CreateUserReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UserResDto } from "../dtos/user/UserResDto";

@Controller('/user')
export class UserController {
    constructor(
        private userUseCases: UserUseCases,
        private readonly logger: Logger
    ) { }

    @Get()
    @ApiOperation({
        summary: "Lấy danh sách tài khoản người dùng"
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
    @Get('/by-email')
    @ApiOperation({
        summary: "Lấy tài khoản người dùng theo email"
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

    @Get(':id')
    @ApiOperation({
        summary: "Lấy tài khoản người dùng theo id"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '23965667-5e9a-4c43-9836-8d196a5c6c6f',
        description: 'id của người dùng cần tìm'
    })
    @ApiOkResponse({
        description: "Get user by id success",
        type: UserResDto
    })
    async getById(@Param('id') id: string) {
        this.logger.log("Get user by id request received", "At user controller");

        const result = await this.userUseCases.getById(id);

        return ApiResponseHelper.success(
            "Get user by id success",
            result,
            200
        )
    }

    @Post()
    @ApiOperation({
        summary: "Tạo 1 tài khoản người dùng"
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

    @Patch(':id')
    @ApiOperation({
        summary: "Cập nhật 1 tài khoản người dùng"
    })
    @ApiBody({
        type: UpdateUserReqDto
    })
    @ApiOkResponse({
        description: "Update user success",
        type: UserResDto
    })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserReqDto) {
        this.logger.log("Update user request received", "At user controller");

        const result = await this.userUseCases.updateUser(id, updateUserDto);

        return ApiResponseHelper.success(
            "Update user success",
            result,
            201
        )
    }

    @Delete(':id')
    @ApiOperation({
        summary: "Xóa tài khoản người dùng theo id"
    })
    @ApiOkResponse({
        description: "Delete user by id success",
        type: UserResDto
    })
    async remove(@Param('id') id: string) {
        this.logger.log("Delete user request received", "At user controller");

        const result = await this.userUseCases.removeUser(id);

        return ApiResponseHelper.success(
            "Delete user by id success",
            result,
            201
        )
    }
}
