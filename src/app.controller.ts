import { Controller, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { lastValueFrom } from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/publish/:topic')
  publish(@Param('topic') topic, @Body() body) {

    this.appService.produce(topic, body);

    return true;
  }


  @Post('/subscribe/:topic')
  async subscribe(@Param('topic') topic, @Body() body) {
    try{
      const res = await this.appService.subscribe(topic, body);
      await lastValueFrom(res);
    } catch (error) {
      console.log(error);
    }

    return {url: body.url, topic: topic};
  }
}