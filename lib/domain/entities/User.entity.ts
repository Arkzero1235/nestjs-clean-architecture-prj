import { BadRequestException } from "@nestjs/common";
import { UserRole } from "../enums/UserRole";

export class User {
    private id: string;
    private username: string;
    private email: string;
    private password: string;
    private address: string;
    private phone: string;
    private role: UserRole;

    private constructor(params: {
        id: string;
        username: string;
        email: string;
        password: string;
        address: string;
        role: UserRole;
    }) {
        this.id = params.id;
        this.username = params.username;
        this.email = params.email;
        this.password = params.password;
        this.address = params.address;
        this.role = params.role;
    }

    getId(): string {
        return this.id;
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

    getPhone(): string {
        return this.phone;
    }

    getAddress(): string {
        return this.address;
    }

    public static create(props: {
        username: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        role: UserRole;
    }) {

        // Check valid

        // Validate username
    if (!props.username || props.username.length < 3) {
        throw new BadRequestException('Username must be at least 3 characters');
    }

    // Validate email
    if (!props.email.includes('@')) {
        throw new BadRequestException('Invalid email address');
    }

    // Validate role
    if (!Object.values(UserRole).includes(props.role)) {
        throw new BadRequestException('Invalid role');
    }

    // Validate password
    const password = props.password;

        // 1. Check length: 6 < password < 14
        if (password.length <= 6 || password.length >= 14) {
            throw new BadRequestException('Password must be between 7 and 13 characters');
        }

        // 2-5. Check all requirements at once
        const validations = [
            { test: /[A-Z]/.test(password), message: 'Password must contain at least one uppercase letter' },
            { test: /[0-9]/.test(password), message: 'Password must contain at least one number' },
            { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Password must contain at least one special character' },
            { test: /[a-zA-Z]/.test(password), message: 'Password must contain letters' }
        ];

        for (const validation of validations) {
            if (!validation.test) {
                throw new BadRequestException(validation.message);
            }
        }

        return props;
    }
}
