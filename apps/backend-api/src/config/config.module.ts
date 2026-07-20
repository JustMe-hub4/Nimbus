import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './config.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
