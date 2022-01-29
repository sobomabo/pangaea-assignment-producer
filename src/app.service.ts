import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { ProducerService } from './modules/kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService, private readonly httpService: HttpService) {}

  async produce(topic: string, payload: any) {

    if(payload)
      await this.producerService.produce({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(payload)
          }
        ],
      });
    return true;
  }

  async subscribe(topic: string, payload: any):Promise<any>{

    return this.httpService.get(payload.url+'/'+topic).pipe(
      map(response => response.data)
    );
  }
}