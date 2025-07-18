import { Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";
import { SliderUseCases } from "./slider.use-case";
import { SliderController } from "lib/interface/controllers/slider.controller";

@Module({
    imports: [InfrastructureModule],
    providers: [SliderUseCases],
    controllers: [SliderController],
    exports: [SliderUseCases]
})
export class SliderModule { }