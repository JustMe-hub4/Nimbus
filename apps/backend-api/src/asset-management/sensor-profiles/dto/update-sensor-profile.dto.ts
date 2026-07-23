import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorProfileDto } from './create-sensor-profile.dto';

export class UpdateSensorProfileDto extends PartialType(CreateSensorProfileDto) {}
