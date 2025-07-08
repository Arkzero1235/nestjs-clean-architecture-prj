export abstract class AuthRepository {

    validatePassword(password: string, hash: string): Promise<boolean> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
}