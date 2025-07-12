import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { CommentUseCases } from "lib/use-case/comment/comment.use-case";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { CreateCommentReqDto } from "../dtos/comment/CreateCommentReqDto";
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

@Injectable()
@Controller("/comment")
export class CommentController {
    constructor(
        private readonly commentUseCases: CommentUseCases,
        private readonly logger: Logger
    ) { }

    @Get("/:userId")
    @ApiOperation({ summary: 'Lấy tất cả bình luận của một người dùng' })
    @ApiParam({
        name: 'userId',
        type: 'string',
        example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d',
        description: 'ID của người dùng cần lấy bình luận'
    })
    @ApiOkResponse({
        description: 'Lấy bình luận thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Get all comments of userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: [
                    {
                        content: 'Sản phẩm rất tốt!',
                    },
                    {
                        content: 'Giao hàng nhanh.'
                    }
                ]
            }
        }
    })
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
    @ApiOperation({ summary: 'Tạo bình luận mới cho người dùng' })
    @ApiBody({
        description: 'Thông tin bình luận cần tạo',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userId: {
                    type: 'string',
                    example: 'd23e1b4a-45fd-4a57-9b0c-21edc938e27d'
                },
                content: {
                    type: 'string',
                    example: 'Sản phẩm này dùng rất tốt!'
                }
            },
            required: ['userId', 'content']
        }
    })
    @ApiCreatedResponse({
        description: 'Tạo bình luận thành công',
        schema: {
            example: {
                statusCode: 201,
                message: 'Create comment for userId d23e1b4a-45fd-4a57-9b0c-21edc938e27d success',
                data: {
                    content: 'Sản phẩm này dùng rất tốt!',
                }
            }
        }
    })
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
    @ApiOperation({ summary: 'Cập nhật nội dung bình luận theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'cmt-001',
        description: 'ID của bình luận cần cập nhật'
    })
    @ApiBody({
        description: 'Nội dung mới của bình luận',
        schema: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    example: 'Sản phẩm này rất tuyệt vời!'
                }
            },
            required: ['content']
        }
    })
    @ApiOkResponse({
        description: 'Cập nhật bình luận thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Update comment success',
                data: {
                    content: 'Sản phẩm này rất tuyệt vời!'
                }
            }
        }
    })
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
    @ApiOperation({ summary: 'Xoá bình luận theo ID' })
    @ApiParam({
        name: 'id',
        type: 'string',
        example: 'cmt-001',
        description: 'ID của bình luận cần xoá'
    })
    @ApiOkResponse({
        description: 'Xoá bình luận thành công',
        schema: {
            example: {
                statusCode: 200,
                message: 'Delete comment success',
                data: {
                    id: 'cmt-001',
                    deleted: true
                }
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'Không tìm thấy bình luận theo ID'
    })
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