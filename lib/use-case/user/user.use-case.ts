import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UpdateUserReqDto } from "lib/interface/dtos/user/UpdateUserReqDto";
import { isUUID } from "class-validator";
import { User } from "lib/domain/entities/User.entity";
import { UserRepository } from "lib/domain/repositories/UserRepository";

@Injectable()
export class UserUseCases {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly logger: Logger
    ) { }

    async createUser(createUserDto: CreateUserDto) {

        // check value  
        if (!createUserDto.email) {
            throw new BadRequestException("Email is required")
        }

        if (!createUserDto.password) {
            throw new BadRequestException("Password is required")
        }

        if (!createUserDto.username) {
            throw new BadRequestException("Username is required")
        }

        if (!createUserDto.role) {
            throw new BadRequestException("Role is required")
        }

        // Check if email is exist
        const existingEmail = await this.userRepository.checkEmail(createUserDto.email);

        if (existingEmail) {
            this.logger.error("Email is existed", undefined, "User usecase: create user");
            throw new ConflictException("Email is already in use");
        }

        // create new user
        const newUserInstance = User.create(createUserDto);

        const newUser = this.userRepository.persist(newUserInstance);

        // save to DB
        return newUser;
    }

    getAllUser(): Promise<object | null> {
        return this.userRepository.find();
    }

    getById(id: string): Promise<object | null> {

        if (!id) {
            throw new BadRequestException("ID is not defined.");
        }

        if (!isUUID(id)) {
            throw new BadRequestException('ID is not a valid UUID.');
        }

        return this.userRepository.getById(id);
    }

    getByEmail(email: string): Promise<object | null> {

        if (!email) {
            throw new BadRequestException('Email is required');
        }

        return this.userRepository.getByEmail(email);
    }

    async updateUser(id: string, updateUserDto: UpdateUserReqDto) {

        if (!id) {
            throw new BadRequestException("ID is undefined")
        }

        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) {
            throw new NotFoundException("User is not found")
        }

        return this.userRepository.merge(id, updateUserDto);
    }

    removeUser(id: string) {

        if (!id) {
            throw new BadRequestException("ID is not defined.");
        }

        if (!isUUID(id)) {
            throw new BadRequestException('ID is not a valid UUID.');
        }

        return this.userRepository.remove(id);
    }

}