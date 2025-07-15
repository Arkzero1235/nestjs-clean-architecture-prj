import { AdminResDto } from "../dtos/admin/AminResDto";
import { CategoryResDto } from "../dtos/category/CategoryResDto";
import { CommentResDto } from "../dtos/comment/CommentResDto";
import { OrderResDto } from "../dtos/order/OrderResDto";
import { UserResDto } from "../dtos/user/UserResDto";


export class ResMapper {

    static mapResData(ormData: object): object {
        return ormData;
    }

    static mapResponseUserDto(ormData: any): UserResDto | null {
        return {
            id: ormData.id,
            username: ormData.userName,
            email: ormData.email,
            address: ormData.address,
            phone: ormData.phone,
            role: ormData.role,
            password: ormData.passwordHash,
            createdAt: ormData.createdAt,
            updatedAt: ormData.updatedAt
        }
    }

    static mapResponseAdminDto(ormData: any): AdminResDto | null {
        return {
            id: ormData.id,
            email: ormData.email,
            name: ormData.name,
            password: ormData.password,
            phone: ormData.phone
        }
    }

    static mapResponseCategoryDto(ormData: any): CategoryResDto | null {
        return {
            id: ormData.id,
            name: ormData.name,
            createdAt: ormData.createdAt,
            updatedAt: ormData.updatedAt
        }
    }

    static mapResponseCategoryDtoList(ormData: any[]): CategoryResDto[] | null {
        return ormData.map(category => ({
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }))
    }

    static mapResponseCommentDto(ormData: any): CommentResDto | null {
        return {
            id: ormData.id,
            content: ormData.content
        }
    }

    static mapResponseCommentDtoList(ormData: any[]): CommentResDto[] | null {
        return ormData.map(comment => ({
            id: comment.id,
            content: comment.content
        }))
    }

    static mapResponseOrderDto(ormData: any): OrderResDto | null {
        return {
            id: ormData.id,
            userId: ormData.userId,
            status: ormData.status,
            total: ormData.total,
            createdAt: ormData.createdAt,
            updatedAt: ormData.updatedAt
        }
    }

    static mapResponseOrderDtoList(ormData: any[]): OrderResDto[] | null {
        return ormData.map(order => ({
            id: order.id,
            userId: order.userId,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        }))
    }
}
