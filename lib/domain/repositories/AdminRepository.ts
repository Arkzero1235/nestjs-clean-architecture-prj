import { CreateAdminDto } from "../dtos/admin/CreateAdminDto";
import { AdminDto } from "../dtos/admin/ResDto";
import { UpdateAdminDto } from "../dtos/admin/UpdateAdminDto";

export abstract class AdminRepository {
    abstract persist(createAdminDto: CreateAdminDto): Promise<AdminDto | null>;
    abstract merge(id: string, updateAdminDto: UpdateAdminDto): Promise<AdminDto | null>;
    abstract remove(id: string): Promise<AdminDto | null>;
    abstract checkMail(email: string): Promise<AdminDto | null>;
    abstract getById(id: string): Promise<AdminDto | null>;
}