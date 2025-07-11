import { Body, Controller, Delete, Injectable, Logger, Param, Patch, Post } from "@nestjs/common";
import { AdminUsecases } from "lib/use-case/admin/admin.use-case";
import { CreateAdminReqDto } from "../dtos/admin/CreateAdminReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";

@Injectable()
@Controller("/admin")
export class AdminController {
    constructor(
        private readonly adminUseCases: AdminUsecases,
        private readonly logger: Logger
    ) { }

    @Post()
    async create(@Body() createAdminReqDto: CreateAdminReqDto) {
        this.logger.log("Create admin request received", "At admin controller");
        const mappedData = ReqMapper.CreateAdminMapper(createAdminReqDto);
        const result = await this.adminUseCases.Create(mappedData);
        return ApiResponseHelper.success(
            "Create admin success",
            result,
            201
        )
    }

    @Patch("/:id")
    async Update(@Body() updateAdminReqDto: UpdateAdminReqDto, @Param("id") id: string) {
        this.logger.log("Update admin request received", "At admin controller");
        const mappedData = ReqMapper.UpdateAdminMapper(updateAdminReqDto);
        const result = await this.adminUseCases.Update(id, mappedData);
        return ApiResponseHelper.success(
            "Update admin success",
            result,
            200
        )
    }

    @Delete("/:id")
    async Remove(@Param("id") id: string) {
        this.logger.log("Delete admin request received", "At admin controller");
        const result = await this.adminUseCases.Delete(id);
        return ApiResponseHelper.success(
            "Delete admin success",
            result,
            200
        )
    }
}