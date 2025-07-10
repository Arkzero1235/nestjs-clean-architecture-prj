export class Admin {
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private phone: string;
    private role: string = "ADMIN";

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getPhone(): string {
        return this.phone;
    }

    getRole(): string {
        return this.role;
    }

    static create(data: {
        name: string;
        email: string;
        password: string;
        phone: string;
        role: string;
    }) {
        // Check validation

        return data;
    }
}