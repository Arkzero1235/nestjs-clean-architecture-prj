import { UserRole } from "../../enums/UserRole";

export class ResponseUserDto {

    id: string

    userName: string

    email: string

    passwordHash: string

    address: string;

    role: UserRole
}