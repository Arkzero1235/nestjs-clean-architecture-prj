import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "lib/domain/dtos/admin/CreateAdminDto";
import { UpdateAdminDto } from "lib/domain/dtos/admin/UpdateAdminDto";
import { Admin } from "lib/domain/entities/Admin.entity";
import { AdminRepository } from "lib/domain/repositories/AdminRepository";

@Injectable()
export class AdminUsecases {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: Them tai khoan admin
    async Create(createAdminDto: CreateAdminDto): Promise<object | null> {
        // Validate data

        // Check email
        const existingEmail = await this.adminRepository.checkMail(createAdminDto.email);

        // Log error
        if (existingEmail) {
            this.logger.error("Email is already in used", undefined, "At create admin usecase");
            throw new ConflictException("Email is already in used");
        }

        // Create new instance
        const newInfor = Admin.create(createAdminDto);

        // Create new admin
        const newAdmin = await this.adminRepository.persist(newInfor);

        // Log result
        if (newAdmin) {
            this.logger.log("Create an admin account success", "At create admin usecase");
        }

        return newAdmin;
    }

    // Usecase: Sua thong tin tai khoan admin
    async Update(id: string, updateAdminDto: UpdateAdminDto): Promise<object | null> {
        // Validate data

        // Check existing user
        const existingUser = await this.adminRepository.getById(id);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found admin", undefined, "At update admin usecase");
            throw new NotFoundException("Cannot found admin");
        }

        // Check email (if needed)
        let existingEmail;

        if (updateAdminDto.email) existingEmail = await this.adminRepository.checkMail(updateAdminDto.email);

        // Log error
        if (existingEmail) {
            this.logger.error("Email is already in used", undefined, "At create admin usecase");
            throw new ConflictException("Email is already in used");
        }

        // Update admin
        const updatedAdmin = await this.adminRepository.merge(id, updateAdminDto);

        // Log result
        if (updatedAdmin) {
            this.logger.log("Update admin success", "At update admin usecase");
        }

        return updatedAdmin;
    }

    // Usecase: Xoa tai khoan admin
    async Delete(id: string): Promise<object | null> {
        // Check existing admin
        const existingUser = await this.adminRepository.getById(id);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found admin", undefined, "At delete admin usecase");
            throw new NotFoundException("Cannot found admin");
        }

        // Delete admin
        const deletedAdmin = await this.adminRepository.remove(id);

        // Log result
        if (deletedAdmin) {
            this.logger.log("Delete admin success", "At delete admin usecase");
        }

        return deletedAdmin;
    }

}