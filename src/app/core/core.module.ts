import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { optionsMongo } from './core.config';
import { ServicesModule } from './services/services.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DSN, optionsMongo),
        ServicesModule,
    ]
})
export class CoreModule { }
