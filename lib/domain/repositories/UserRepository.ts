import { FullUserDto } from "../../application/dtos/FullUserDto";
import { LoginDto } from "../../application/dtos/LoginDto";
import { ResponseUserDto } from "../../application/dtos/ResponseUserDto";
import { UpdateUserDto } from "../../application/dtos/UpdateUserDto";
import { User } from "../entities/User.entity";

export abstract class UserRepository {

    abstract persist(user: User): Promise<object>;

    abstract merge(id: string, updateUser: UpdateUserDto): Promise<object>;

    abstract remove(id: string): Promise<object>;

    abstract getById(id: string): Promise<object | null>;

    abstract getByEmail(email: string): Promise<object | null>;

    abstract checkEmail(email: string): Promise<ResponseUserDto | null>;

    abstract find(): Promise<object>;
}