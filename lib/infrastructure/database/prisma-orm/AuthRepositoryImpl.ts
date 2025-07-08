import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "lib/domain/repository/AuthRepository";
import { IPasswordHasher } from "lib/application/service/IPasswordHasher";

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        private iPasswordHasher: IPasswordHasher
    ) { }

    async validatePassword(password: string, hash: string): Promise<boolean> {
        try {

            const checkPassword = await this.iPasswordHasher.verify(hash, password);

            if (!checkPassword) {
                throw new UnauthorizedException("Password is not correct")
            }

            return true

        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

}