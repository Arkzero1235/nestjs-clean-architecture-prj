import { CreateCommentDto } from "../dtos/comment/CreateCommentDto";
import { UpdateCommentDto } from "../dtos/comment/UpdateCommentDto";

export abstract class CommentRepository {
    abstract persist(createCommentDto: CreateCommentDto): Promise<object | null>;
    abstract merge(id: string, updateCommentDto: UpdateCommentDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | undefined>;
    abstract find(userId: string): Promise<object | null>;
    abstract getById(id: string): Promise<object | null>;
}