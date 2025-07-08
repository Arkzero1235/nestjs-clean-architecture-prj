import { FullUserDto } from "../dto/FullUserDto";
import { LoginDto } from "../dto/LoginDto";
import { ResponseUserDto } from "../dto/ResponseUserDto";
import { UpdateUserDto } from "../dto/UpdateUserDto";
import { User } from "../entity/User.entity";

export abstract class UserRepository {
    persist(user: User): Promise<object> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    merge(id: string, updateUser: UpdateUserDto): Promise<object> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    remove(id: string): Promise<object> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    getById(id: string): Promise<object | null> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    getByEmail(email: string): Promise<object | null> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    checkEmail(email: string): Promise<ResponseUserDto | null> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
    find(): Promise<object> {
        throw new Error('METHOD_MUST_BE_IMPLEMENTED')
    }
}