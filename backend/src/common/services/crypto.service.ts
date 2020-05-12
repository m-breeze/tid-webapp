import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { SHA512 } from '../../constants';

export interface IPassHash {
  hash: any;
  salt: string;
  iterations: number;
}

@Injectable()
export class CryptoService {
  public hashPassword(password: string): Promise<IPassHash> {
    const salt = crypto.randomBytes(128).toString('base64');
    const iterations = 100;
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, iterations, 64, SHA512, (err, key) => {
        err ? reject(err) : resolve({ salt, hash: key, iterations });
      });
    });
  }

  public isPasswordCorrect(savedHash: Buffer, savedSalt: string, savedIterations: number, passwordAttempt: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations, 64, SHA512, (err, key: any) => {
        const result = Buffer.compare(savedHash, key);
        err ? reject(err) : resolve(result === 0 ? true : false);
      });
    });
  }
}
