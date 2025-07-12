import { CreateAdminDto } from "../dtos/admin/CreateAdminDto";
import { ResponseAdminDto } from "../dtos/admin/ResponseAdminDto copy";
import { UpdateAdminDto } from "../dtos/admin/UpdateAdminDto";

export abstract class AdminRepository {
    abstract persist(createAdminDto: CreateAdminDto): Promise<object | null>;
    abstract merge(id: string, updateAdminDto: UpdateAdminDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract checkMail(email: string): Promise<ResponseAdminDto | null>;
    abstract getById(id: string): Promise<object | null>;
}