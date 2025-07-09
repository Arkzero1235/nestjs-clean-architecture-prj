import { UserRole } from "@prisma/client";
import { ResponseUserDto } from "../../application/dtos/ResponseUserDto";
import { FullUserDto } from "../../application/dtos/FullUserDto";

export class User {
    private readonly id: string;
    private username: string;
    private email: string;
    private password: string;
    private role: UserRole;

    private constructor(params: {
        username: string;
        email: string;
        password: string;
        role: UserRole;
    }) {
        this.username = params.username;
        this.email = params.email;
        this.password = params.password;
        this.role = params.role;
    }

    getUserName(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): UserRole {
        return this.role;
    }

    getpassword(): string {
        return this.password;
    }

    public static create(props: {
        username: string;
        email: string;
        password: string;
        role: UserRole;
    }): User {

        // Check valid

        // Validate username
        if (!props.username || props.username.length < 3) {
            throw new Error('Username must be at least 3 characters');
        }

        // Validate email
        if (!props.email.includes('@')) {
            throw new Error('Invalid email address');
        }

        // Validate password hash
        if (!props.password || props.password.length < 8) {
            throw new Error('Password is too short');
        }

        // Role should be enum value
        if (!Object.values(UserRole).includes(props.role)) {
            throw new Error('Invalid role');
        }

        return new User(props);
    }

    public static responseUser(data: {
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        role: UserRole;
    }): ResponseUserDto {
        return {
            id: data.id,
            userName: data.username,
            email: data.email,
            passwordHash: data.passwordHash,
            role: data.role,
        };
    }

    public static fullResponseUser(data: {
        id: string;
        username: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }): FullUserDto {
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
    }
}
