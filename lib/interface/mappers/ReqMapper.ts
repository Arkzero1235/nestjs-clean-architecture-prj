import { LoginDto } from "lib/domain/dtos/user/LoginDto";
import { LoginReqDto } from "../dtos/LoginReqDto";
import { CreateUerReqDto } from "../dtos/user/CreateUserReqDto";
import { CreateUserDto } from "lib/domain/dtos/user/CreateUserDto";
import { UserRoleMapper } from "./UserRoleMapper";
import { CreateAdminReqDto } from "../dtos/admin/CreateAdminReqDto";
import { CreateAdminDto } from "lib/domain/dtos/admin/CreateAdminDto";
import { UpdateAdminReqDto } from "../dtos/admin/UpdateAdminReqDto";
import { UpdateAdminDto } from "lib/domain/dtos/admin/UpdateAdminDto";
import { CreateCategoryReqDto } from "../dtos/category/CreateCategoryReqDto";
import { CreateCategoryDto } from "lib/domain/dtos/category/CreateCategoryDto";
import { UpdateCategoryReqDto } from "../dtos/category/UpdateCategoryReqDto";
import { UpdateCategoryDto } from "lib/domain/dtos/category/UpdateCateGoryDto";
import { CreateCommentReqDto } from "../dtos/comment/CreateCommentReqDto";
import { CreateCommentDto } from "lib/domain/dtos/comment/CreateCommentDto";
import { UpdateCommentReqDto } from "../dtos/comment/UpdateCommentReqDto";
import { UpdateCommentDto } from "lib/domain/dtos/comment/UpdateCommentDto";
import { CreateOrderReqDto } from "../dtos/order/CreateOrderReqDto";
import { CreateOrderDto } from "lib/domain/dtos/order/CreateOrderDto";
import { OrderStatusMapper } from "./OrderStatusMapper";
import { UpdateOrderReqDto } from "../dtos/order/UpdateOrderReqDto";
import { UpdateOrderDto } from "lib/domain/dtos/order/UpdateOrderDto";
import { CreateProductReqDto } from "../dtos/product/CreateProductReqDto";
import { CreateProductDto } from "lib/domain/dtos/product/CreateProductDto";
import { UpdateProductReqDto } from "../dtos/product/UpdateProductReqDto";
import { UpdateProductDto } from "lib/domain/dtos/product/UpdatePriductDto";
import { CreateSliderReqDto } from "../dtos/slider/CreateSliderReqDto";
import { CreateSliderDto } from "lib/domain/dtos/slider/CreateSliderDto";
import { UpdateSliderReqDto } from "../dtos/slider/UpdateSliderReqDto";
import { UpdateSliderDto } from "lib/domain/dtos/slider/UpdateSliderDto";

export class ReqMapper {
    static LoginMapper(LoginReqDto: LoginReqDto): LoginDto {
        return {
            email: LoginReqDto.email,
            password: LoginReqDto.password,
        }
    }

    static CreateUserMapper(createReqDto: CreateUerReqDto): CreateUserDto {
        return {
            username: createReqDto.userName,
            email: createReqDto.email,
            password: createReqDto.password,
            address: createReqDto.address,
            phone: createReqDto.phone,
            role: UserRoleMapper.map(createReqDto.role)
        }
    }

    static CreateAdminMapper(createAdminReqDto: CreateAdminReqDto): CreateAdminDto {
        return {
            email: createAdminReqDto.email,
            name: createAdminReqDto.name,
            password: createAdminReqDto.password,
            phone: createAdminReqDto.phone
        }
    }

    static UpdateAdminMapper(updateAdminReqDto: UpdateAdminReqDto): UpdateAdminDto {
        return {
            email: updateAdminReqDto.email,
            name: updateAdminReqDto.name,
            password: updateAdminReqDto.password,
            phone: updateAdminReqDto.phone
        }
    }

    static CreateCategoryMapper(createCategoryReqDto: CreateCategoryReqDto): CreateCategoryDto {
        return {
            name: createCategoryReqDto.name
        }
    }

    static UpdateCategoryMapper(updateCategoryReqDto: UpdateCategoryReqDto): UpdateCategoryDto {
        return {
            name: updateCategoryReqDto.name
        }
    }

    static CreateCommentMapper(createCommentReqDto: CreateCommentReqDto): CreateCommentDto {
        return {
            userId: createCommentReqDto.userId,
            content: createCommentReqDto.content
        }
    }

    static UpdateCommentMapper(UpdateCommentReqDto: UpdateCommentReqDto): UpdateCommentDto {
        return {
            content: UpdateCommentReqDto.content
        }
    }

    static CreateOrderMapper(createOrderReqDto: CreateOrderReqDto): CreateOrderDto {
        return {
            userId: createOrderReqDto.userId,
            productId: createOrderReqDto.productId,
            quantity: createOrderReqDto.quantity
        }
    }

    static UpdateOrderMapper(updateOrderReqDto: UpdateOrderReqDto): UpdateOrderDto {
        return {
            userId: updateOrderReqDto.userId,
            id: updateOrderReqDto.id,
            status: OrderStatusMapper.map(updateOrderReqDto.status)
        }
    }

    static CreateProductMapper(createProductReqDto: CreateProductReqDto): CreateProductDto {
        return {
            name: createProductReqDto.name,
            price: createProductReqDto.price,
            image: createProductReqDto.image,
            stock: createProductReqDto.stock,
            description: createProductReqDto.description,
            storage: createProductReqDto.storage,
            categoryId: createProductReqDto.categoryId
        }
    }

    static UpdateProductMapper(updateProductReqDto: UpdateProductReqDto): UpdateProductDto {
        return {
            name: updateProductReqDto.name,
            price: updateProductReqDto.price,
            image: updateProductReqDto.image,
            stock: updateProductReqDto.stock,
            description: updateProductReqDto.description,
            storage: updateProductReqDto.storage,
            categoryId: updateProductReqDto.categoryId
        }
    }

    static CreateSliderMapper(createSliderReqDto: CreateSliderReqDto): CreateSliderDto {
        return {
            title: createSliderReqDto.title,
            url: createSliderReqDto.url,
            image: createSliderReqDto.image,
            adminId: createSliderReqDto.adminId
        }
    }

    static UpdateSliderMapper(updateSliderReqDto: UpdateSliderReqDto): UpdateSliderDto {
        return {
            title: updateSliderReqDto.title,
            url: updateSliderReqDto.url,
            image: updateSliderReqDto.image,
            adminId: updateSliderReqDto.adminId
        }
    }
}