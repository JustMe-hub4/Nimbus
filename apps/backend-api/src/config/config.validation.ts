import { plainToClass } from 'class-transformer';
import { IsString, IsNumber, IsOptional, Min, Max, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @IsString()
  REDIS_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  @Min(4)
  @Max(16)
  @IsOptional()
  BCRYPT_ROUNDS: number = 12;

  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRY: string = '15m';

  @IsNumber()
  @Min(1)
  @IsOptional()
  REFRESH_TOKEN_DAYS: number = 7;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Config validation error: ${errors.toString()}`);
  }
  return validatedConfig;
}
