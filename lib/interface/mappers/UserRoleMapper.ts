import { UserRole } from "lib/domain/enums/UserRole";

export class UserRoleMapper {
    static map(role: string): UserRole {
        const toUpperCase = role.toUpperCase();

        switch (toUpperCase) {
            case 'ADMIN': return UserRole.admin;
            case 'CLIENT': return UserRole.client;
            default: throw new Error(`Unknow role :${role}`);
        }
    }
}