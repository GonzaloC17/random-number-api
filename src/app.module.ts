import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomModule } from './random.module';
import { TimestampMiddleware } from './timestamp.middleware';

@Module({
  imports: [RandomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimestampMiddleware).forRoutes('*');
  }
}
