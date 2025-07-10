import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthUseCase } from "lib/use-case/auth/auth.use-case";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { LoginDtoMapper } from "../mappers/LoginDtoMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { Response, Request } from 'express';

@Controller('/auth')
export class AuthController {
    constructor(private authUseCase: AuthUseCase) { }

    @Post('/login')
    async login(@Body() loginReqDto: LoginReqDto, @Res({ passthrough: true }) res: Response) {
        const mapLoginData = LoginDtoMapper.map(loginReqDto);

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