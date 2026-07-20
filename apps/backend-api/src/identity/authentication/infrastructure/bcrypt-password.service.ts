import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../domain/password.service';

@Injectable()
export class BcryptPasswordService implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(private configService: ConfigService) {
    // Ensure we get a valid number
    const rounds = this.configService.get<string>('BCRYPT_ROUNDS', '12');
    this.saltRounds = parseInt(rounds, 10);
    if (isNaN(this.saltRounds) || this.saltRounds < 4) {
      this.saltRounds = 12;
    }
    console.log('BcryptPasswordService: using salt rounds =', this.saltRounds);
  }

  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      console.error('bcrypt.hash error:', error);
      throw new Error('Password hashing failed');
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('bcrypt.compare error:', error);
      return false;
    }
  }
}
