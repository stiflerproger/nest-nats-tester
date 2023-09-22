import { Global, Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Global()
@Module({
  providers: [
    {
      provide: 'NATS_CLIENT',
      useFactory: async () => {
        const clientProxy: ClientProxy = ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            url: 'nats://127.0.0.1:4222',
          },
        });

        await clientProxy.connect();

        return clientProxy;
      },
    },
  ],
  exports: ['NATS_CLIENT'],
})
export class NatsClientModule {}
