import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './modules/kafka/kafka.module';

@Module({
  imports: [KafkaModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}