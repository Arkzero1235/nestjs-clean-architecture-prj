import { Injectable } from "@nestjs/common";
import { IPasswordHasher } from "lib/domain-core/services/IPasswordHasher";
import * as argon2 from 'argon2';

@Injectable()
export class BCryptPasswordHasher implements IPasswordHasher {

    async hash(plain: string): Promise<string> {

        const passwordHash = await argon2.hash(plain);

        return passwordHash;
    }

    async verify(hash: string, password: string): Promise<Boolean> {
        return await argon2.verify(hash, password);
    }

}