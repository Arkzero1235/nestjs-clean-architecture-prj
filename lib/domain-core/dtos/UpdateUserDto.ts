import { UserRole } from "lib/domain-core/enums/UserRole";

export class UpdateUserDto {

    username?: string;

    email?: string;

    role?: UserRole;
}