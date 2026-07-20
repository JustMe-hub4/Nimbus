import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { AssetManagementModule } from './asset-management/asset-management.module';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.orm.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    IdentityModule,
    AssetManagementModule,
    TelemetryModule,
  ],
})
export class AppModule {}
