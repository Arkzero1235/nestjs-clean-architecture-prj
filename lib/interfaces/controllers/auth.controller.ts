import { Body, Controller, Post } from "@nestjs/common";
import { AuthUseCase } from "lib/application/use-case/auth/auth.use-case";
import { LoginDto } from "lib/application/dtos/LoginDto";

@Controller('/auth')
export class AuthController {
    constructor(private authUseCase: AuthUseCase) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return this.authUseCase.login(loginDto);
    }
}