import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "lib/domain/dto/CreateUserDto";
import { User } from "lib/domain/entity/User.entity";

@Injectable()
export class UserFactoryService {
    createUser(createUserDto: CreateUserDto): User {

        return User.create(
            {
                username: createUserDto.username,
                email: createUserDto.email,
                password: createUserDto.plainPassword,
                role: createUserDto.role
            }
        )
    }
}