import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetDeviceUseCase {
  constructor(@Inject('IDeviceRepository') private deviceRepo: IDeviceRepository) {}

  async execute(id: string) {
    const device = await this.deviceRepo.findById(id);
    if (!device) {
      throw new AppException(ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', HttpStatus.NOT_FOUND);
    }
    return device;
  }
}
