import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query } from "@nestjs/common";
import { UserUseCases } from "lib/use-case/user/user.use-case";
import { UpdateUserReqDto } from "lib/interface/dtos/user/UpdateUserReqDto";
import { CreateReqDto } from "../dtos/user/CreateUserReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";

@Controller('/user')
export class UserController {
    constructor(
        private userUseCases: UserUseCases,
        private readonly logger: Logger
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách toàn bộ người dùng' })
    @ApiOkResponse({
        description: 'Danh sách người dùng',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                message: { type: 'string', example: 'Get all users' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', format: 'uuid', example: 'b32c439a-7f7a-4a17-ab16-73342f669260' },
                            userName: { type: 'string', example: 'Pansysthm3112' },
                            email: { type: 'string', format: 'email', example: 'buixuandung309@gmail.com' },
                            passwordHash: {
                                type: 'string',
                                example: '$argon2id$v=19$m=65536,t=3,p=4$MODrO9TAAQ...'
                            },
                            address: { type: 'string', example: 'Hà Nội' },
                            phone: { type: 'string', example: '0966587913' },
                            role: {
                                type: 'string',
                                enum: ['ADMIN', 'CLIENT'],
                                example: 'CLIENT'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time',
                                example: '2025-07-10T16:55:03.601Z'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time',
                                example: '2025-07-10T16:55:03.601Z'
                            },
                        },
                    },
                },
            },
        },
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
    @ApiOperation({ summary: 'Lấy thông tin người dùng theo email' })
    @ApiQuery({
        name: 'email',
        type: 'string',
        required: true,
        example: 'buixuandung309@gmail.com',
        description: 'Email của người dùng cần tìm',
    })
    @ApiOkResponse({
        description: 'Lấy user theo email thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Get user by email success',
                data: {
                    id: 'b32c439a-7f7a-4a17-ab16-73342f669260',
                    userName: 'Pansysthm3112',
                    email: 'buixuandung309@gmail.com',
                    passwordHash: '$argon2id$...',
                    address: 'Hà Nội',
                    phone: '0966587913',
                    role: 'CLIENT',
                    createdAt: '2025-07-10T16:55:03.601Z',
                    updatedAt: '2025-07-10T16:55:03.601Z',
                },
            },
        },
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
    @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        required: true,
        example: 'b32c439a-7f7a-4a17-ab16-73342f669260',
        description: 'ID của người dùng cần lấy thông tin',
    })
    @ApiOkResponse({
        description: 'Lấy user theo ID thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Get user by id success',
                data: {
                    id: 'b32c439a-7f7a-4a17-ab16-73342f669260',
                    userName: 'Pansysthm3112',
                    email: 'buixuandung309@gmail.com',
                    passwordHash: '$argon2id$...',
                    address: 'Hà Nội',
                    phone: '0966587913',
                    role: 'CLIENT',
                    createdAt: '2025-07-10T16:55:03.601Z',
                    updatedAt: '2025-07-10T16:55:03.601Z',
                },
            },
        },
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
    @ApiOperation({ summary: 'Tạo mới người dùng' })
    @ApiBody({
        description: 'Thông tin người dùng cần tạo',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userName: { type: 'string', example: 'Arkzero123' },
                email: { type: 'string', format: 'email', example: 'ark@example.com' },
                password: { type: 'string', example: 'yourPassword123' },
                phone: { type: 'string', example: '0966587913' },
                address: { type: 'string', example: 'Hà Nội' },
                role: {
                    type: 'string',
                    enum: ['ADMIN', 'CLIENT'],
                    example: 'CLIENT',
                },
            },
            required: ['userName', 'email', 'password', 'phone', 'address', 'role'],
        },
    })
    @ApiCreatedResponse({
        description: 'Tạo user mới thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Create new user success',
                data: {
                    id: 'f98e0f6b-ef33-4fc6-9b2f-cde8ee780812',
                    userName: 'Arkzero123',
                    email: 'ark@example.com',
                    passwordHash: '$argon2id$...',
                    phone: '0966587913',
                    address: 'Hà Nội',
                    role: 'CLIENT',
                    createdAt: '2025-07-12T10:15:00.000Z',
                    updatedAt: '2025-07-12T10:15:00.000Z',
                },
            },
        },
    })
    async create(@Body() create_user: CreateReqDto) {
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
    @ApiOperation({ summary: 'Cập nhật người dùng theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'd9e12f4e-1132-4df5-a7f4-f09b8ff0f2c4',
        description: 'ID của người dùng cần cập nhật'
    })
    @ApiBody({
        description: 'Thông tin cập nhật người dùng (có thể chỉ truyền một phần)',
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'ArkzeroNew' },
                email: { type: 'string', format: 'email', example: 'arkzero_update@example.com' },
                role: {
                    type: 'string',
                    enum: ['ADMIN', 'CLIENT'],
                    example: 'CLIENT'
                }
            }
        }
    })
    @ApiCreatedResponse({
        description: 'Cập nhật thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Update user success',
                data: {
                    id: 'b32c439a-7f7a-4a17-ab16-73342f669260',
                    userName: 'ArkzeroNewName',
                    email: 'arknew@example.com',
                    passwordHash: '$argon2id$...',
                    phone: '0987654321',
                    address: 'TP HCM',
                    role: 'CLIENT',
                    createdAt: '2025-07-10T16:55:03.601Z',
                    updatedAt: '2025-07-12T17:12:30.000Z',
                },
            },
        },
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
    @ApiOperation({ summary: 'Xoá người dùng theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'd9e12f4e-1132-4df5-a7f4-f09b8ff0f2c4',
        description: 'ID của người dùng cần xoá'
    })
    @ApiCreatedResponse({
        description: 'Xoá người dùng thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Delete user success',
                data: {
                    id: 'd9e12f4e-1132-4df5-a7f4-f09b8ff0f2c4',
                    deleted: true
                }
            }
        }
    })
    async remove(@Param('id') id: string) {
        this.logger.log("Delete user request received", "At user controller");

        const result = await this.userUseCases.removeUser(id);

        return ApiResponseHelper.success(
            "Delete user success",
            result,
            201
        )
    }
}
