import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { CommentUseCases } from "./comment.use-case";
import { CommentController } from "lib/interface/controllers/comment.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [CommentUseCases],
    controllers: [CommentController],
    exports: [CommentUseCases]
})
export class CommentModule { }