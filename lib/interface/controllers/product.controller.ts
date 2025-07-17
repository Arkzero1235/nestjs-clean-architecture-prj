import { Body, Controller, Injectable, Logger, Post } from "@nestjs/common";
import { ProductUseCases } from "lib/use-case/product/product.use-case";
import { CreateProductReqDto } from "../dtos/product/CreateProductReqDto";
import { ReqMapper } from "../mappers/ReqMapper";
import { ApiResponseHelper } from "../helper/response-helper";

@Injectable()
@Controller("/product")
export class ProductController {
    constructor(
        private readonly productUseCases: ProductUseCases,
        private readonly logger: Logger
    ) { }

    @Post()
    async create(@Body() createProductReqDto: CreateProductReqDto) {
        this.logger.log("Create product request received", "At product controller");
        const mappedData = ReqMapper.CreateProductMapper(createProductReqDto);
        const result = await this.productUseCases.create(mappedData);
        return ApiResponseHelper.success(
            "Create product success",
            result,
            200
        )
    }
}