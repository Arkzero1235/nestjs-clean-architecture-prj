import { CreateCommentDto } from "../dtos/comment/CreateCommentDto";

export class Comment {
    private id: string;
    private content: string;

    getId(): string {
        return this.id;
    }

    getContent(): string {
        return this.content;
    }

    static Create(data: CreateCommentDto) {
        // Validate data

        return data;
    }
}