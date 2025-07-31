import { Body, Controller, Delete, Get, Injectable, Logger, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { SliderUseCases } from "lib/use-case/slider/slider.use-case";
import { CreateSliderReqDto } from "../dtos/slider/CreateSliderReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateSliderReqDto } from "../dtos/slider/UpdateSliderReqDto";
import { AuthenticationGuard } from "lib/infrastructure/jwt/authentication.guard";
import { AuthorizationGuard } from "lib/infrastructure/jwt/authorization.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { Roles } from "lib/infrastructure/jwt/roles.decorator";

@Injectable()
@ApiBearerAuth()
@Controller("/slider")
export class SliderController {
    constructor(
        private readonly sliderUseCases: SliderUseCases,
        private readonly logger: Logger
    ) { }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Post()
    @ApiOperation({
        summary: "Tạo mới 1 slider - ADMIN"
    })
    @ApiBody({
        type: CreateSliderReqDto
    })
    async create(@Body() createSliderReqDto: CreateSliderReqDto) {
        this.logger.log("Create slider request received", "At slider controller");
        const mappedData = ReqMapper.CreateSliderMapper(createSliderReqDto);
        const result = await this.sliderUseCases.create(mappedData);
        return ApiResponseHelper.success(
            "Create slider success",
            result,
            201
        )
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Patch("/:id")
    @ApiOperation({
        summary: "Cập nhật 1 slider hiện có - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: 'e3037b7f-655f-4eba-8506-0299380465f1',
        description: 'id của slider cần cập nhật'
    })
    @ApiBody({
        type: UpdateSliderReqDto
    })
    async update(@Body() updateSliderReqDto: UpdateSliderReqDto, @Param("id") id: string) {
        this.logger.log("Update slider request received", "At slider controller");
        const mappedData = ReqMapper.UpdateSliderMapper(updateSliderReqDto);
        const result = await this.sliderUseCases.update(id, mappedData);
        return ApiResponseHelper.success(
            "Update slider success",
            result,
            200
        )
    }

    @UseGuards(AuthenticationGuard, AuthorizationGuard)
    @Roles(["ADMIN"])
    @Delete("/:id")
    @ApiOperation({
        summary: "Xóa 1 slider theo id - ADMIN"
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: 'e3037b7f-655f-4eba-8506-0299380465f1',
        description: 'id của slider cần xóa'
    })
    async remove(@Param("id") id: string) {
        this.logger.log("Delete slider request received", "At slider controller");
        const result = await this.sliderUseCases.remove(id);
        return ApiResponseHelper.success(
            "Delete slider success",
            result,
            200
        )
    }

    @Get()
    @ApiOperation({
        summary: "Lấy tất cả sliders có trong db - CLIENT - ADMIN"
    })
    async find() {
        this.logger.log("Get all sliders request received", "At slider controller");
        const result = await this.sliderUseCases.find();
        return ApiResponseHelper.success(
            "Get all sliders success",
            result,
            200
        )
    }
}