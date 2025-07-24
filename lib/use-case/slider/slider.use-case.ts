import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateSliderDto } from "lib/domain/dtos/slider/CreateSliderDto";
import { UpdateSliderDto } from "lib/domain/dtos/slider/UpdateSliderDto";
import { Slider } from "lib/domain/entities/Slider.entity";
import { AdminRepository } from "lib/domain/repositories/AdminRepository";
import { SliderRepository } from "lib/domain/repositories/SliderRepository";

@Injectable()
export class SliderUseCases {
    constructor(
        private readonly sliderRepository: SliderRepository,
        private readonly adminRepository: AdminRepository,
        private readonly logger: Logger
    ) { }

    // Usecase: Tạo 1 slider
    async create(createSliderDto: CreateSliderDto) {
        // Validate data

        // Check existing admin
        const existingAdmin = await this.adminRepository.getById(createSliderDto.adminId);

        // Log error
        if (!existingAdmin) {
            this.logger.error("Cannot find admin", undefined, "At create slider usecase");
            throw new NotFoundException("Cannot find admin");
        }

        // Check existing slider & title
        const existingTitle = await this.sliderRepository.getByName(createSliderDto.title);

        if (existingTitle) {
            this.logger.error("Slider is already in used", undefined, "At create slider usecase");
            throw new NotFoundException("Slider is already in used");
        }

        // New instance
        const newInstance = Slider.Create(createSliderDto);

        // Create slider
        const createdSlider = await this.sliderRepository.persist(newInstance);

        // Log result
        this.logger.log("Create new slider success", "At create slider usecase");

        return createdSlider;
    }

    // Usecase: Cập nhật 1 slider
    async update(id: string, updateSliderDto: UpdateSliderDto) {
        // Validate data

        // Check existing admin
        const existingAdmin = await this.adminRepository.getById(updateSliderDto.adminId);

        // Log error
        if (!existingAdmin) {
            this.logger.error("Cannot find admin", undefined, "At update slider usecase");
            throw new NotFoundException("Cannot find admin");
        }

        // Check existing title
        if (updateSliderDto.title) {
            const existingTitle = await this.sliderRepository.getByName(updateSliderDto.title);

            if (existingTitle) {
                this.logger.error("Title is already in used", undefined, "At update slider usecase");
                throw new NotFoundException("Title is already in used");
            }
        }

        // Update slider
        const updatedSlider = await this.sliderRepository.merge(id, updateSliderDto);

        // Log result
        this.logger.log("Update slider success", "At update slider usecase");

        return updatedSlider;
    }

    // Usecase: xóa 1 slider
    async remove(id: string) {
        // Validate data

        // Check existing slider
        const existingSlider = await this.sliderRepository.getById(id);

        // Log error        
        if (!existingSlider) {
            this.logger.error("Cannot find slider", undefined, "At delete slider usecase");
            throw new NotFoundException("Cannot find slider");
        }

        // Delete slider
        const deletedSlider = await this.sliderRepository.remove(id);

        // Log result
        this.logger.log("Delete slider success", "At delete slider usecase");

        return deletedSlider;

    }

    // Usecase: lấy danh sách sliders
    async find() {
        const allSliders = await this.sliderRepository.find();

        // Log result
        this.logger.log("Get all sliders success", "At get all sliders usecase");

        return allSliders;
    }

}