export abstract class ITokenService {
    abstract generateAccessToken(payload: any): string;
    abstract generateRefreshToken(payload: any): string;
    abstract verifyAccessToken(token: string): any;
    abstract verifyRefreshToken(token: string): any;
}
