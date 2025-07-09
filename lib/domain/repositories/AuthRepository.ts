export abstract class AuthRepository {

    abstract validatePassword(password: string, hash: string): Promise<boolean>;

}