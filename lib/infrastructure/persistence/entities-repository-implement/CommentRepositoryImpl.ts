import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { CommentDto } from "lib/domain/dtos/comment/ResDto";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { CommentRepository } from "lib/domain/repositories/CommentRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";
import { ResMapper } from "lib/interface/mappers/ResMapper";

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async persist(createCommentDto: CreateCommentDto): Promise<CommentDto | null> {
        try {
            // Create comment
            const create_comment_result = await this.prismaService.comment.create({
                data: {
                    content: createCommentDto.content,
                    userId: createCommentDto.userId
                }
            })

            return ResMapper.mapResponseCommentDto(create_comment_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async merge(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentDto | null> {
        try {
            // Update comment
            const update_comment_result = await this.prismaService.comment.update({
                where: {
                    id: id
                },
                data: {
                    content: updateCommentDto.content
                }
            })

            return ResMapper.mapResponseCommentDto(update_comment_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async remove(id: string): Promise<CommentDto | null> {
        try {
            // Delete comment
            const delete_comment_result = await this.prismaService.comment.delete({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseCommentDto(delete_comment_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

    async find(userId: string): Promise<CommentDto[] | null> {
        try {
            // Find all comments of user with id
            const all_comment_result = await this.prismaService.comment.findMany({
                where: {
                    userId: userId
                }
            })

            return ResMapper.mapResponseCommentDtoList(all_comment_result);

        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException("Server error 2");
        }
    }

    async getById(id: string): Promise<CommentDto | null> {
        try {
            // Get comment by id
            const get_comment_by_id_result = await this.prismaService.comment.findUnique({
                where: {
                    id: id
                }
            })

            return ResMapper.mapResponseCommentDto(get_comment_by_id_result);

        } catch (error) {
            throw new InternalServerErrorException("Server error");
        }
    }

}