import { UserRole } from "lib/domain-core/enums/UserRole"

export class CreateUserDto {

    username: string;

    email: string;

    password: string;

    role: UserRole;
}