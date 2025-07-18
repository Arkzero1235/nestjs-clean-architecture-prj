import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { Comment } from "lib/domain/entities/Comment.entity";
import { CommentRepository } from "lib/domain/repositories/CommentRepository";
import { UserRepository } from "lib/domain/repositories/UserRepository";

@Injectable()
export class CommentUseCases {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly userRepository: UserRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: tao mot comment
    async create(createCommentDto: CreateCommentDto) {
        // Validate data

        // Check existing user
        const existingUser = await this.userRepository.getById(createCommentDto.userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot found user", undefined, "At create comment usecase");
            throw new NotFoundException("Cannot found user to create comment");
        }

        // New instance
        const newInstance = Comment.Create({
            userId: createCommentDto.userId,
            content: createCommentDto.content
        })

        // Create new comment for userId
        const newComment = await this.commentRepository.persist(newInstance);

        // Log result
        this.logger.log(`Create new comment for userId ${createCommentDto.userId} success`, "At create comment usecase");

        return newComment;
    }

    // Usecase: cap nhat comment
    async update(id: string, updateCommentDto: UpdateCommentDto) {
        // Validate data

        // Check existing comment
        const existingComment = await this.commentRepository.getById(id);

        // Log error
        if (!existingComment) {
            this.logger.error("Cannot find comment", undefined, "At update comment usecase");
            throw new NotFoundException("Cannot found comment");
        }

        // Update comment
        const updatedComment = await this.commentRepository.merge(id, updateCommentDto)

        // Log result
        this.logger.log(`Update comment success`, "At create comment usecase");

        return updatedComment;
    }

    // Usecase: xoa comment
    async remove(id: string) {
        // Check existing comment
        const existingComment = await this.commentRepository.getById(id);

        // Log error
        if (!existingComment) {
            this.logger.error("Cannot find comment", undefined, "At delete comment usecase");
            throw new NotFoundException("Cannot found comment");
        }

        // Delete comment
        const deletedComment = await this.commentRepository.remove(id);

        // Log result
        this.logger.log(`Delete comment success`, "At delete comment usecase");

        return deletedComment;
    }

    // Usecase: lay danh sach comment cua 1 user
    async find(userId: string) {
        // Check existing user
        const existingUser = await this.userRepository.getById(userId);

        // Log error
        if (!existingUser) {
            this.logger.error("Cannot find user", undefined, "At create comment usecase");
            throw new NotFoundException("Cannot find user");
        }

        // Get comments of userId
        const gettedComment = await this.commentRepository.find(userId);

        // Log result
        this.logger.log(`Get comments of userId ${userId} success`, "At get comments of userId usecase");

        return gettedComment;
    }
}