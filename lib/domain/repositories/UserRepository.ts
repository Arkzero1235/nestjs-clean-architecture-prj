import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { UpdateUserReqDto } from "../../interface/dtos/user/UpdateUserReqDto";
import { UserDto } from "../dtos/user/ResDto";

export abstract class UserRepository {

    abstract persist(createUserDto: CreateUserDto): Promise<UserDto | null>;

    abstract merge(id: string, updateUser: UpdateUserReqDto): Promise<UserDto | null>;

    abstract remove(id: string): Promise<UserDto | null>;

    abstract getById(id: string): Promise<UserDto | null>;

    abstract getByEmail(email: string): Promise<UserDto | null>;

    abstract checkEmail(email: string): Promise<UserDto | null>;

    abstract find(): Promise<UserDto[] | null>;

}