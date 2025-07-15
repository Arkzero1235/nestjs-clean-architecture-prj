import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "lib/domain/repositories/UserRepository";
import { PrismaService } from "../../database/prisma-orm/prisma.service";
import { IPasswordHasher } from "lib/domain/services/IPasswordHasher";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserReqDto } from "lib/interface/dtos/user/UpdateUserReqDto";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { ResMapper } from "lib/interface/mappers/ResMapper";
import { UserDto } from "lib/domain/dtos/user/ResDto";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        private prismaService: PrismaService,
        private iPasswordHasher: IPasswordHasher
    ) { }

    async persist(user: CreateUserDto): Promise<UserDto | null> {
        try {
            const passwordHash = await this.iPasswordHasher.hash(user.password)

            const create_result = await this.prismaService.user.create({
                data: {
                    email: user.email,
                    userName: user.username,
                    passwordHash: passwordHash,
                    address: user.address,
                    phone: user.phone,
                    role: user.role
                }
            })

            return ResMapper.mapResponseUserDto(create_result);

        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                const target = error.meta?.target as string[] | undefined;

                if (target?.includes('email')) {
                    throw new ConflictException('Email is already in use');
                }

                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async merge(id: string, updateUserDto: UpdateUserReqDto): Promise<UserDto | null> {
        try {
            const data: any = {
                ...(updateUserDto.username && { username: updateUserDto.username }),
                ...(updateUserDto.email && { email: updateUserDto.email }),
                ...(updateUserDto.role && { role: updateUserDto.role }),
            };

            const updated_result = await this.prismaService.user.update({
                where: {
                    id: id
                },
                data
            })

            if (!updateUserDto) {
                throw new BadRequestException("Update error")
            }

            return ResMapper.mapResponseUserDto(updated_result);

        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async remove(id: string): Promise<UserDto | null> {
        try {
            const remove_result = await this.prismaService.user.delete({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseUserDto(remove_result);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`User is not found.`);
            }

            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async getById(id: string): Promise<UserDto | null> {
        try {
            const get_by_id_result = await this.prismaService.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!get_by_id_result) {
                return null
            }

            return ResMapper.mapResponseUserDto(get_by_id_result);

        } catch (error) {

            if (
                error instanceof PrismaClientKnownRequestError &&
                error.message.includes('invalid character') &&
                error.message.includes('UUID')
            ) {
                throw new BadRequestException('ID must be a valid UUID');
            }

            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async getByEmail(email: string): Promise<UserDto | null> {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const get_by_email_result = await this.prismaService.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!get_by_email_result) {
                throw new NotFoundException("User with that email was not found");
            }

            if (!get_by_email_result.id ||
                !get_by_email_result.userName ||
                !get_by_email_result.email ||
                !get_by_email_result.passwordHash ||
                !get_by_email_result.role) {

                throw new Error('Data is not valid for the user entity');

            }

            return ResMapper.mapResponseUserDto(get_by_email_result);

        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async checkEmail(email: string): Promise<UserDto | null> {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const check_email_result = await this.prismaService.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!check_email_result) {
                return null
            }

            return ResMapper.mapResponseUserDto(check_email_result)

        } catch (error) {
            console.error('❌ checkEmail ERROR:', error);
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async find(): Promise<UserDto | null> {
        try {
            const get_all_users_result = await this.prismaService.user.findMany();

            if (!get_all_users_result || get_all_users_result.length == 0) {
                throw new NotFoundException("There is no user")
            }

            return ResMapper.mapResponseUserDto(get_all_users_result);

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

}