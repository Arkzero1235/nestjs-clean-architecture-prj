import { UserRole } from "../../enums/UserRole";

export class CreateUserDto {

    username: string;

    email: string;

    password: string;

    phone: string;

    address: string;

    role: UserRole;
}