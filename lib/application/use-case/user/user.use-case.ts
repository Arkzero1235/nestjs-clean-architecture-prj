import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "lib/application/dtos/CreateUserDto";
import { UpdateUserDto } from "lib/application/dtos/UpdateUserDto";
import { isUUID } from "class-validator";
import { User } from "lib/domain/entities/User.entity";
import { UserRepository } from "lib/domain/repositories/UserRepository";

@Injectable()
export class UserUseCases {
    constructor(
        private userRepository: UserRepository
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<object> {

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
            throw new ConflictException("Email is already in use");
        }

        // create new user
        const newUser = User.create(createUserDto);

        return this.userRepository.persist(newUser);
    }

    getAllUser(): Promise<object> {
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

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<object> {

        if (!id) {
            throw new BadRequestException("ID is undefined")
        }

        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) {
            throw new NotFoundException("User is not found")
        }

        return this.userRepository.merge(id, updateUserDto);
    }

    removeUser(id: string): Promise<object> {

        if (!id) {
            throw new BadRequestException("ID is not defined.");
        }

        if (!isUUID(id)) {
            throw new BadRequestException('ID is not a valid UUID.');
        }

        return this.userRepository.remove(id);
    }

}