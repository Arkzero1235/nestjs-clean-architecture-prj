import { CreateSliderDto } from "../dtos/slider/CreateSliderDto";
import { SliderDto } from "../dtos/slider/ResDto";
import { UpdateSliderDto } from "../dtos/slider/UpdateSliderDto";

export abstract class SliderRepository {
    abstract persist(createSliderDto: CreateSliderDto): Promise<SliderDto | null>;
    abstract merge(id: string, updateSliderDto: UpdateSliderDto): Promise<SliderDto | null>;
    abstract remove(id: string): Promise<SliderDto | null>;
    abstract find(): Promise<SliderDto[] | null>;
    abstract getById(id: string): Promise<SliderDto | null>;
    abstract getByName(title: string): Promise<SliderDto | null>;
}