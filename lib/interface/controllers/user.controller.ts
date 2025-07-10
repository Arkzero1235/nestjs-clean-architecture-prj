import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserUseCases } from "lib/use-case/user/user.use-case";
import { UpdateUserDto } from "lib/domain/dtos/user/UpdateUserDto";
import { CreateReqDto } from "../dtos/CreateReqDto";
import { CreateDtoMapper } from "../mappers/CreateDtoMapper";
import { ApiResponseHelper } from "../helper/response-helper";

@Controller('/user')
export class UserController {
    constructor(
        private userUseCases: UserUseCases,
    ) { }

    @Get()
    async getAll() {
        const result = await this.userUseCases.getAllUser();

        return ApiResponseHelper.success(
            "Get all users",
            result,
            200
        )
    }

    // GET /user/by-email?email=abc@example.com
    @Get('/by-email')
    async getByEmail(@Query('email') email: string) {
        const result = await this.userUseCases.getByEmail(email);

        return ApiResponseHelper.success(
            "Get user by email success",
            result,
            200
        )
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const result = await this.userUseCases.getById(id);

        return ApiResponseHelper.success(
            "Get user by id success",
            result,
            200
        )
    }

    @Post()
    async create(@Body() create_user: CreateReqDto) {
        const mapData = CreateDtoMapper.map(create_user); // map req data -> use case data
        const result = await this.userUseCases.createUser(mapData);

        return ApiResponseHelper.success(
            "Create new user success",
            result,
            201
        )
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto) {
        const result = await this.userUseCases.updateUser(id, updateUserDto);

        return ApiResponseHelper.success(
            "Update user success",
            result,
            201
        )
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.userUseCases.removeUser(id);

        return ApiResponseHelper.success(
            "Delete user success",
            result,
            201
        )
    }
}
