import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "lib/domain/repository/UserRepository";
import { PrismaService } from "./prisma.service";
import { User } from "lib/domain/entity/User.entity";
import { IPasswordHasher } from "lib/application/service/IPasswordHasher";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserDto } from "lib/domain/dto/UpdateUserDto";
import { ApiResponseHelper } from "lib/helper/response-helper";
import { ResponseUserDto } from "lib/domain/dto/ResponseUserDto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(
        private prismaService: PrismaService,
        private iPasswordHasher: IPasswordHasher
    ) { }

    async persist(user: User): Promise<object> {
        try {
            const passwordHash = await this.iPasswordHasher.hash(user.getpassword())

            const saved = await this.prismaService.user.create({
                data: {
                    email: user.getEmail(),
                    userName: user.getUserName(),
                    passwordHash: passwordHash,
                    role: user.getRole()
                },
                select: {
                    id: true,
                    userName: true,
                    email: true,
                    passwordHash: true,
                    role: true
                }
            })

            return ApiResponseHelper.success(
                "Create user successed",
                User.responseUser({
                    id: saved.id,
                    username: saved.userName,
                    email: saved.email,
                    passwordHash: saved.passwordHash,
                    role: saved.role
                }),
                201
            )

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

    async merge(id: string, updateUserDto: UpdateUserDto): Promise<object> {
        try {
            const data: any = {
                ...(updateUserDto.username && { username: updateUserDto.username }),
                ...(updateUserDto.email && { email: updateUserDto.email }),
                ...(updateUserDto.role && { role: updateUserDto.role }),
            };

            const updatedRes = await this.prismaService.user.update({
                where: {
                    id: id
                },
                data
            })

            if (!updateUserDto) {
                throw new BadRequestException("Update error")
            }

            return ApiResponseHelper.success(
                "Update successed",
                updatedRes,
                200
            )
        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async remove(id: string): Promise<object> {
        try {
            const result = await this.prismaService.user.delete({
                where: {
                    id: id
                }
            })

            return User.responseUser(
                {
                    id: result.id,
                    username: result.userName,
                    email: result.email,
                    passwordHash: result.passwordHash,
                    role: result.role
                }
            )
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`User is not found.`);
            }

            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async getById(id: string): Promise<object> {
        try {
            const resUser = await this.prismaService.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!resUser) {
                throw new NotFoundException("User is not found")
            }

            return ApiResponseHelper.success(
                "Get user by id successed",
                User.fullResponseUser({
                    id: resUser.id,
                    username: resUser.userName,
                    email: resUser.email,
                    role: resUser.role,
                    createdAt: resUser.createdAt,
                    updatedAt: resUser.updatedAt
                }),
                200
            )

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

    async getByEmail(email: string): Promise<object | null> {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const raw = await this.prismaService.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    userName: true,
                    email: true,
                    passwordHash: true,
                    role: true
                }
            })

            if (!raw) {
                throw new NotFoundException("User with that email was not found");
            }

            if (!raw.id || !raw.userName || !raw.email || !raw.passwordHash || !raw.role) {
                throw new Error('Data is not valid for the user entity');
            }

            console.log(raw);


            return ApiResponseHelper.success(
                "Get user by email successed",
                User.responseUser(
                    {
                        id: raw.id,
                        username: raw.userName,
                        email: raw.email,
                        passwordHash: raw.passwordHash,
                        role: raw.role
                    }
                ),
                200
            )

        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async checkEmail(email: string): Promise<ResponseUserDto | null> {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const raw = await this.prismaService.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    userName: true,
                    email: true,
                    passwordHash: true,
                    role: true
                }
            })

            if (!raw) {
                return null
            }

            return raw ?? null

        } catch (error) {
            console.error('❌ checkEmail ERROR:', error);
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

    async find(): Promise<object> {
        try {
            const allUsers = await this.prismaService.user.findMany();

            if (!allUsers || allUsers.length == 0) {
                throw new NotFoundException("There is no user")
            }

            return ApiResponseHelper.success(
                "Get all users successed",
                allUsers,
                200
            )
        } catch (error) {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }

}