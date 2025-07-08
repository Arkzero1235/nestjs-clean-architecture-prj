import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserFactoryService } from "./user.factory";
import { UserRepository } from "lib/domain/repository/UserRepository";
import { CreateUserDto } from "lib/domain/dto/CreateUserDto";
import { UpdateUserDto } from "lib/domain/dto/UpdateUserDto";
import { isUUID } from "class-validator";
import { LoginDto } from "lib/domain/dto/LoginDto";

@Injectable()
export class UserUseCases {
    constructor(
        private userFactoryService: UserFactoryService,
        private userRepository: UserRepository
    ) { }

    async createUser(creaUserDto: CreateUserDto): Promise<object> {

        // check value  
        if (!creaUserDto.email) {
            throw new BadRequestException("Email is required")
        }

        if (!creaUserDto.plainPassword) {
            throw new BadRequestException("Password is required")
        }


        if (!creaUserDto.username) {
            throw new BadRequestException("Username is required")
        }


        if (!creaUserDto.role) {
            throw new BadRequestException("Role is required")
        }

        // Check if email is exist
        const existingEmail = await this.userRepository.checkEmail(creaUserDto.email);

        if (existingEmail) {
            throw new ConflictException("Email is already in use");
        }

        // create new user
        const newUser = this.userFactoryService.createUser(creaUserDto);

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