import { Body, Controller, Get, Injectable, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthUseCases } from "lib/use-case/auth/auth.use-case";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateUerReqDto } from "../dtos/user/CreateUserReqDto";
import { UserResDto } from "../dtos/user/UserResDto";
import { UserUseCases } from "lib/use-case/user/user.use-case";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(
        private authUseCase: AuthUseCases,
        private readonly userUseCases: UserUseCases,
        private readonly logger: Logger
    ) { }

    @Post('/login')
    @ApiOperation({
        summary: "Đăng nhập tài khoản - CLIENT"
    })
    @ApiBody({
        type: LoginReqDto
    })
    @ApiCreatedResponse({
        description: "Login success",
        schema: {
            type: "object",
            properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        sub: { type: 'string', example: 'b32c439a-7f7a-4a17-ab16-73342f669260' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' }
                    }
                }
            }
        }
    })
    async login(@Body() loginReqDto: LoginReqDto, @Res({ passthrough: true }) res: Response) {
        this.logger.log("Login request received", "At auth controller");

        const mapLoginData = ReqMapper.LoginMapper(loginReqDto);

        const { id, username, time, accessToken, refreshToken } = await this.authUseCase.login(mapLoginData);

        res.cookie('re_tkn', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        })

        return ApiResponseHelper.success(
            "Login successed",
            {
                sub: id,
                username: username,
                time: time,
                token: accessToken
            },
            201
        )
    }

    @Post('/admin')
    @ApiOperation({
        summary: "Đăng nhập tài khoản admin - ADMIN"
    })
    @ApiBody({
        type: LoginReqDto
    })
    @ApiCreatedResponse({
        description: "Login success",
        schema: {
            type: "object",
            properties: {
                statusCode: { type: 'number', example: 201 },
                data: {
                    type: 'object',
                    properties: {
                        sub: { type: 'string', example: 'b32c439a-7f7a-4a17-ab16-73342f669260' },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' }
                    }
                }
            }
        }
    })
    async loginAdmin(@Body() loginReqDto: LoginReqDto, @Res({ passthrough: true }) res: Response) {
        this.logger.log("Login request received", "At auth controller");

        const mapLoginData = ReqMapper.LoginMapper(loginReqDto);

        const { id, name, time, accessToken, refreshToken } = await this.authUseCase.loginAdmin(mapLoginData);

        res.cookie('re_tkn', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        })

        return ApiResponseHelper.success(
            "Login successed",
            {
                sub: id,
                name: name,
                time: time,
                token: accessToken
            },
            201
        )
    }

    @Post()
    @ApiOperation({
        summary: "Đăng ký tài khoản người dùng - CLIENT"
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

    @Get('/refresh-token')
    @ApiOperation({
        summary: "Tạo mới access token - CLIENT - ADMIN"
    })
    @ApiOkResponse({
        description: "Renew access token success",
        schema: {
            type: "object",
            properties: {
                accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' }
            }
        }
    })
    async refreshToken(@Req() req: Request) {
        this.logger.log("Renew token request received", "At auth controller");
        const token = req.cookies['re_tkn'];
        const newAccessToken = await this.authUseCase.refresh(token);
        return ApiResponseHelper.success(
            "Renew token success",
            { accessToken: newAccessToken },
            200
        )
    }

    @Post('logout')
    @ApiOperation({
        summary: "Đăng xuất tài khoản - CLIENT - ADMIN"
    })
    @ApiCreatedResponse({
        description: "Logout success",
        schema: {
            type: "object",
            properties: {}
        }
    })
    async logout(@Res({ passthrough: true }) res: Response) {
        this.logger.log("Logout request received", "At auth controller");

        res.clearCookie('re_tkn', {
            path: '/',              // Quan trọng!
            httpOnly: true,         // Cookie đang có
            secure: false,
            sameSite: 'lax'
        });
        const message = await this.authUseCase.logout();

        return ApiResponseHelper.success(
            message,
            {},
            201
        )
    }

    @UseGuards(AuthenticationGuard)
    @ApiBearerAuth()
    @Post('profile')
    @ApiOperation({
        summary: "Kiểm tra đăng nhập - CLIENT - ADMIN"
    })
    @ApiOkResponse({
        description: "Check login success",
        schema: {
            type: "object",
            properties: {}
        }
    })
    async profile(@Req() req: Request) {
        this.logger.log("Check login request received", "At auth controller");

        const user: any = req?.user;

        if (!user) {
            this.logger.error("Check login failed", undefined, "At auth controller");
        }

        const result = await this.userUseCases.getById(user.id);

        return ApiResponseHelper.success(
            "Check login success",
            result,
            200
        )
    }
}