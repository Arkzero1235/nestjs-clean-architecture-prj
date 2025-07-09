import { CreateUserDto } from "../dtos/CreateUserDto";
import { ResponseUserDto } from "../dtos/ResponseUserDto";
import { UpdateUserDto } from "../dtos/UpdateUserDto";

export abstract class UserRepository {

    abstract persist(createUserDto: CreateUserDto): Promise<object>;

    abstract merge(id: string, updateUser: UpdateUserDto): Promise<object>;

    abstract remove(id: string): Promise<object>;

    abstract getById(id: string): Promise<object | null>;

    abstract getByEmail(email: string): Promise<object | null>;

    abstract checkEmail(email: string): Promise<ResponseUserDto | null>;

    abstract find(): Promise<object>;
}