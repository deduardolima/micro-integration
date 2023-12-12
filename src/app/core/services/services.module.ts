import { Global, Module } from "@nestjs/common";
import { CdcService } from "./cdc.services";
import { ConvertDate } from "./convert.date.service";
import { Authenticator } from "./authenticator";

@Global()
@Module({
  providers: [CdcService, ConvertDate, Authenticator],
  exports: [CdcService, ConvertDate, Authenticator]
})
export class ServicesModule { }