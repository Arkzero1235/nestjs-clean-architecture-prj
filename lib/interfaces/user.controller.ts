import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserUseCases } from "lib/application/use-case/user/user.use-case";
import { CreateUserDto } from "lib/domain/dto/CreateUserDto";
import { LoginDto } from "lib/domain/dto/LoginDto";
import { UpdateUserDto } from "lib/domain/dto/UpdateUserDto";

@Controller('/user')
export class UserController {
    constructor(private userUseCases: UserUseCases) { }

    @Get()
    async getAll() {
        return this.userUseCases.getAllUser();
    }

    // GET /user/by-email?email=abc@example.com
    @Get('/by-email')
    async getByEmail(@Query('email') email: string) {
        return this.userUseCases.getByEmail(email);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.userUseCases.getById(id);
    }

    @Post()
    async create(@Body() create_user: CreateUserDto) {
        return this.userUseCases.createUser(create_user);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.userUseCases.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userUseCases.removeUser(id);
    }
}