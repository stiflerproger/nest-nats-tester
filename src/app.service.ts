import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('NATS_CLIENT')
    private nats: ClientProxy,
  ) {}
  async onModuleInit() {
    const response = await firstValueFrom(
      this.nats
        .send('nast-endpoint', {
          test: 1,
        })
        .pipe(timeout(30000)),
    );

    console.log(response);
  }
}
