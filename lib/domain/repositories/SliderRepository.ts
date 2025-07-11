import { CreateSliderDto } from "../dtos/slider/CreateSliderDto";
import { UpdateSliderDto } from "../dtos/slider/UpdateSliderDto";

export abstract class SliderRepository {
    abstract persist(createSliderDto: CreateSliderDto): Promise<object | null>;
    abstract merge(updateSliderDto: UpdateSliderDto): Promise<object | null>;
    abstract remove(id: string): Promise<object | null>;
    abstract find(): Promise<object | null>;
    abstract getById(id: string): Promise<object | null>;
}