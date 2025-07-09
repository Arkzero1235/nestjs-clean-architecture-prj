import { UserRole } from "lib/domain-core/enums/UserRole";

export class UserRoleMapper {
    static map(role: string): UserRole {
        const toUpperCase = role.toUpperCase();

        switch (toUpperCase) {
            case 'ADMIN': return UserRole.admin;
            case 'CLIENT': return UserRole.client;
            case 'AUTHOR': return UserRole.author;
            default: throw new Error(`Unknow role :${role}`);
        }
    }
}