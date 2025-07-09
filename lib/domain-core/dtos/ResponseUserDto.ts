import { UserRole } from "lib/domain-core/enums/UserRole"

export class ResponseUserDto {

    id: string

    userName: string

    email: string

    passwordHash: string

    role: UserRole
}