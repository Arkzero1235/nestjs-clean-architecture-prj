import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { CommentUseCases } from "lib/use-case/comment/comment.use-case";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { CreateCommentReqDto } from "../dtos/comment/CreateCommentReqDto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CommentResDto } from "../dtos/comment/CommentResDto";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";
import { UpdateCommentReqDto } from "../dtos/comment/UpdateCommentReqDto";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@ApiBearerAuth()
@Controller("/comment")
export class CommentController {
    constructor(
        private readonly commentUseCases: CommentUseCases,
        private readonly logger: Logger
    ) { }

    @Roles(["ADMIN", "CLIENT"])
    @Get("/:userId")
    @ApiOperation({
        summary: "Lấy bình luận người dùng theo id - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'userId',
        type: String,
        required: true,
        example: '2d011518-d44f-4957-975c-54fdf88f28a8',
        description: 'id của người dùng cần lấy bình luận'
    })
    @ApiOkResponse({
        description: "Get user by id success",
        type: CommentResDto
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

    @Roles(["CLIENT"])
    @Post()
    @ApiOperation({
        summary: "Tạo mới 1 bình luận - CLIENT"
    })
    @ApiBody({
        type: CreateCommentReqDto
    })
    @ApiCreatedResponse({
        description: "Create comment success",
        type: CommentResDto
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
    @Roles(["ADMIN", "CLIENT"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật 1 bình luận của người dùng - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: 'b386adff-f6fb-4dc0-afde-a75f99cf20d0',
        description: 'id của bình luận cần cập nhật'
    })
    @ApiBody({
        type: UpdateCommentReqDto
    })
    @ApiOkResponse({
        description: "Update comment success",
        type: CommentResDto
    })
    async merge(@Body() updateCommentReqDto: UpdateCommentReqDto, @Param("id") id: string) {
        this.logger.log("Update comment request received", "At comment controller");
        const mappedData = ReqMapper.UpdateCommentMapper(updateCommentReqDto);
        const result = await this.commentUseCases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update comment success",
            result,
            200
        )
    }

    @Roles(["ADMIN", "CLIENT"])
    @Delete("/:id")
    @ApiOperation({
        summary: "Xóa 1 bình luận theo id - CLIENT - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '66beffba-085c-4834-8aeb-6a997cc22921',
        description: 'id của bình luận cần xóa'
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