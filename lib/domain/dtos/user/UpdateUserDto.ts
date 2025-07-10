import { UserRole } from "../../enums/UserRole";

export class UpdateUserDto {

    username?: string;

    email?: string;

    role?: UserRole;
}