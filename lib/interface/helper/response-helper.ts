export class ApiResponseHelper {
    static success(message: string, data: any, statusCode = 200) {
        return { statusCode, message, data };
    }
}
