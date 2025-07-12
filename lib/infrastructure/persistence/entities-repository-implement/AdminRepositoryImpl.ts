import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "lib/domain/dtos/admin/CreateAdminDto";
import { ResponseAdminDto } from "lib/domain/dtos/admin/ResponseAdminDto copy";
import { UpdateAdminDto } from "lib/domain/dtos/admin/UpdateAdminDto";
import { AdminRepository } from "lib/domain/repositories/AdminRepository";
import { IPasswordHasher } from "lib/domain/services/IPasswordHasher";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class AdminRepositoryImpl implements AdminRepository {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly iPasswordHasher: IPasswordHasher,
    ) { }

    async getById(id: string): Promise<object | null> {
        try {
            // Get admin by id
            const get_admin_by_id_result = await this.prismaService.admin.findFirst({
                where: {
                    id: id
                }
            })

            if (!get_admin_by_id_result) {
                return null;
            }

            return ResMapper.mapResponseAdminDto(get_admin_by_id_result);
        } catch (error) {
            throw new InternalServerErrorException("server error")
        }
    }

    async checkMail(email: string): Promise<ResponseAdminDto | null> {
        try {

            // Check admin by email
            const check_email_result = await this.prismaService.admin.findUnique({
                where: {
                    email: email
                }
            })

            if (!check_email_result) {
                return null;
            }

            return ResMapper.mapResponseAdminDto(check_email_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async persist(createAdminDto: CreateAdminDto): Promise<object | null> {
        try {

            // Hash password
            const passwordHash = await this.iPasswordHasher.hash(createAdminDto.password)

            // Create new admin
            const create_admin_result = await this.prismaService.admin.create({
                data: {
                    name: createAdminDto.name,
                    email: createAdminDto.email,
                    password: passwordHash,
                    phone: createAdminDto.phone,
                    role: "ADMIN"
                }
            })

            return ResMapper.mapResponseAdminDto(create_admin_result);
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async merge(id: string, updateAdminDto: UpdateAdminDto): Promise<object | null> {
        try {
            // Filter undefined or null data
            const data: any = {
                ...(updateAdminDto.email && { email: updateAdminDto.email }),
                ...(updateAdminDto.name && { name: updateAdminDto.name }),
                ...(updateAdminDto.password && { password: updateAdminDto.password }),
                ...(updateAdminDto.phone && { phone: updateAdminDto.phone })
            }

            // hash new password (if exist)
            let passwordHash: string;
            if (data.password) {
                passwordHash = await this.iPasswordHasher.hash(data.password);
                data.password = passwordHash;
            }

            const update_admin_result = await this.prismaService.admin.update({
                where: {
                    id: id
                },
                data
            })

            return ResMapper.mapResponseAdminDto(update_admin_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async remove(id: string): Promise<object | null> {
        try {
            // Delete admin
            const delete_admin_result = await this.prismaService.admin.delete({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseAdminDto(delete_admin_result);
        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

}