import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { CommentUseCases } from "lib/use-case/comment/comment.use-case";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { CreateCommentReqDto } from "../dtos/comment/CreateCommentReqDto";

@Injectable()
@Controller("/comment")
export class CommentController {
    constructor(
        private readonly commentUseCases: CommentUseCases,
        private readonly logger: Logger
    ) { }

    @Get("/:userId")
    async find(@Param("userId") userId: string) {
        this.logger.log(`Get all comments of userId ${userId} request received`, "At comment controller");
        const result = await this.commentUseCases.find(userId);
        return ApiResponseHelper.success(
            `Get all comments of userId ${userId} success`,
            result,
            200
        )
    }

    @Post()
    async create(@Body() createCommentReqDto: CreateCommentReqDto) {
        this.logger.log("Create comment request received", "At comment controller");
        const mappedData = ReqMapper.CreateCommentMapper(createCommentReqDto);
        const result = await this.commentUseCases.create(mappedData);
        return ApiResponseHelper.success(
            `Create comment for userId ${createCommentReqDto.userId} success`,
            result,
            201
        )
    }

    @Patch("/:id")
    async merge(@Body() updateCommentDto: UpdateCommentDto, @Param("id") id: string) {
        this.logger.log("Update comment request received", "At comment controller");
        const mappedData = ReqMapper.UpdateCommentMapper(updateCommentDto);
        const result = await this.commentUseCases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update comment success",
            result,
            200
        )
    }

    @Delete("/:id")
    async remove(@Param("id") id: string) {
        this.logger.log("Delete comment request received", "At comment controller");
        const result = await this.commentUseCases.remove(id);
        return ApiResponseHelper.success(
            "Delete comment success",
            result,
            200
        )
    }
}