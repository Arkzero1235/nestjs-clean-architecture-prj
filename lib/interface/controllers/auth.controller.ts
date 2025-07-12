import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthUseCase } from "lib/use-case/auth/auth.use-case";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { Response, Request } from 'express';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('/auth')
export class AuthController {
    constructor(private authUseCase: AuthUseCase) { }

    @Post('/login')
    @ApiOperation({ summary: 'Đăng nhập' })
    @ApiBody({
        description: 'Thông tin đăng nhập',
        required: true,
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: '123456' },
            },
            required: ['email', 'password'],
        },
    })
    @ApiCreatedResponse({
        description: 'Đăng nhập thành công, refresh token được lưu vào cookie',
        schema: {
            example: {
                statusCode: 201,
                message: 'Login successed',
                data: {
                    sub: 'userId123',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    })
    async login(@Body() loginReqDto: LoginReqDto, @Res({ passthrough: true }) res: Response) {
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

    @ApiOperation({
        summary: 'Làm mới access token từ refresh token (qua cookie)',
        description:
            'Yêu cầu phải có cookie tên `re_tkn` chứa refresh token. Trả về access token mới.',
    })
    @ApiOkResponse({
        description: 'Làm mới token thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Renew token success',
                data: {
                    accessToken: 'new.jwt.access.token',
                },
            },
        },
    })
    @Get('refresh-token')
    async refreshToken(@Req() req: Request) {

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
        summary: 'Đăng xuất',
        description: 'Xoá refresh token khỏi cookie và huỷ session đăng nhập',
    })
    @ApiCreatedResponse({
        description: 'Đăng xuất thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Logout success',
                data: {},
            },
        },
    })
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('re_tkn');

        const message = await this.authUseCase.logout();

        return ApiResponseHelper.success(
            message,
            {},
            201
        )
    }
}