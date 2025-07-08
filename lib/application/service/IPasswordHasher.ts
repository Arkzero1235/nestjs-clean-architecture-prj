export abstract class IPasswordHasher {
    hash(plain: string): Promise<string> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    verify(hash: string, password: string): Promise<Boolean> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
}