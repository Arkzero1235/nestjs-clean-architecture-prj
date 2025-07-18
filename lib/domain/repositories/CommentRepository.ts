import { CreateCommentDto } from "../dtos/comment/CreateCommentDto";
import { CommentDto } from "../dtos/comment/ResDto";
import { UpdateCommentDto } from "../dtos/comment/UpdateCommentDto";

export abstract class CommentRepository {
    abstract persist(createCommentDto: CreateCommentDto): Promise<CommentDto | null>;
    abstract merge(id: string, updateCommentDto: UpdateCommentDto): Promise<CommentDto | null>;
    abstract remove(id: string): Promise<CommentDto | null>;
    abstract find(userId: string): Promise<CommentDto[] | null>;
    abstract getById(id: string): Promise<CommentDto | null>;
}