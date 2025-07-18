import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSliderDto } from "lib/domain/dtos/slider/CreateSliderDto";
import { SliderDto } from "lib/domain/dtos/slider/ResDto";
import { UpdateSliderDto } from "lib/domain/dtos/slider/UpdateSliderDto";
import { SliderRepository } from "lib/domain/repositories/SliderRepository";
import { PrismaService } from "lib/infrastructure/database/prisma-orm/prisma.service";

@Injectable()
export class SliderRepositoryImpl implements SliderRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async persist(createSliderDto: CreateSliderDto): Promise<SliderDto | null> {
        try {
            const create_result = await this.prismaService.slider.create({
                data: {
                    title: createSliderDto.title,
                    url: createSliderDto.url,
                    image: createSliderDto.image,
                    adminId: createSliderDto.adminId
                }
            })

            return create_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async merge(id: string, updateSliderDto: UpdateSliderDto): Promise<SliderDto | null> {
        try {
            // Filter undefined or null data
            const data: any = {
                ...(updateSliderDto.title && { title: updateSliderDto.title }),
                ...(updateSliderDto.url && { url: updateSliderDto.url }),
                ...(updateSliderDto.image && { image: updateSliderDto.image }),
                ...(updateSliderDto.adminId && { adminId: updateSliderDto.adminId })
            }

            const update_data = await this.prismaService.slider.update({
                where: {
                    id: id
                },
                data
            })

            return update_data;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async remove(id: string): Promise<SliderDto | null> {
        try {
            const delete_result = await this.prismaService.slider.delete({
                where: {
                    id: id
                }
            })

            return delete_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async find(): Promise<SliderDto[] | null> {
        try {
            const all_sliders = await this.prismaService.slider.findMany();

            return all_sliders;
        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

    async getById(id: string): Promise<SliderDto | null> {
        try {
            const get_by_id_result = await this.prismaService.slider.findFirst({
                where: {
                    id: id
                }
            })

            if (!get_by_id_result) return null;

            return get_by_id_result;

        } catch (error) {
            throw new InternalServerErrorException("Server error")
        }
    }

}