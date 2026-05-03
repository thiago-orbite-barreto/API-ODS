import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Practice, PracticeSchema } from './practice.schema';
import { PracticesController } from './practices.controller';
import { PracticesService } from './practices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Practice.name, schema: PracticeSchema }])],
  controllers: [PracticesController],
  providers: [PracticesService],
})
export class PracticesModule {}
