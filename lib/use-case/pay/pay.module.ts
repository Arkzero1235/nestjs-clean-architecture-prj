import { PayosController } from "lib/interface/controllers/pay.controller";
import { PayosService } from "./pay.service";
import { Logger, Module } from "@nestjs/common";
import { InfrastructureModule } from "lib/infrastructure/persistence/infrastructure.module";

@Module({
    imports: [InfrastructureModule],
    controllers: [PayosController],
    providers: [PayosService],
    exports: [PayosService]
})
export class PayosModule { }
