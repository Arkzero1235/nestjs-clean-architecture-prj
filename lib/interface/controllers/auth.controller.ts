import { Body, Controller, Get, Logger, Post, Req, Res } from "@nestjs/common";
import { AuthUseCases } from "lib/use-case/auth/auth.use-case";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { Response, Request } from 'express';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('/auth')
export class AuthController {
    constructor(
        private authUseCase: AuthUseCases,
        private readonly logger: Logger
    ) { }

    @Post('/login')
    @ApiOperation({
        summary: "Đăng nhập tài khoản"
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

        const { id, accessToken, refreshToken } = await this.authUseCase.login(mapLoginData);

        res.cookie('re_tkn', refreshToken, {
            httpOnly: true,
            secure: false, // bật lên true nếu dùng https
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        })

        return ApiResponseHelper.success(
            "Login successed",
            {
                sub: id,
                token: accessToken
            },
            201
        )
    }

    @Get('/refresh-token')
    @ApiOperation({
        summary: "Tạo mới access token"
    })
    @ApiCreatedResponse({
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
        summary: "Đăng xuất tài khoản"
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

        res.clearCookie('re_tkn');

        const message = await this.authUseCase.logout();

        return ApiResponseHelper.success(
            message,
            {},
            201
        )
    }
}