export abstract class IPasswordHasher {
    abstract hash(plain: string): Promise<string>;
    abstract verify(hash: string, password: string): Promise<Boolean>;
}