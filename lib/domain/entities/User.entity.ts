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

        // Validate address

        // Role should be enum value
        if (!Object.values(UserRole).includes(props.role)) {
            throw new Error('Invalid role');
        }

        return props;
    }
}
