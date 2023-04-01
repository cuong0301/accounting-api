import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LoggerMiddleware } from './services/logger.service';
import { JwtStrategy } from './auth/jwt.strategy';
import DatabaseModule from './database.module';
import { ContractsModule } from './contracts/contracts.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [DatabaseModule, ContractsModule, CustomersModule],

  providers: [JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('/docs').forRoutes('/');
  }
}
