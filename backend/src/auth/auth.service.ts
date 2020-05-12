import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { SECRET, JWT_1W } from '../constants';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from './dto/auth.dto';
import { CryptoService } from '../common/services/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CryptoService)
    private readonly cryptoService: CryptoService,
  ) {}

  async signUp(data: AuthDTO): Promise<string> {
    const userBodyWithPass: User = Object.assign({}, data, { password: await this.cryptoService.hashPassword(data.password) });
    const user = await this.userService.create(userBodyWithPass);
    return jwt.sign({ userId: user.id }, SECRET, { expiresIn: JWT_1W });
  }

  async login(data: AuthDTO): Promise<string> {
    const user: User = await this.userRepository.findOne({ where: [
      { email: data.email },
      { username: data.username },
    ]});
    if (!user) {
      throw new HttpException('Wrong login credentials', HttpStatus.UNAUTHORIZED);
    }
    const isCorrect = await this.cryptoService.isPasswordCorrect(
      Buffer.from(user.password.hash.data), user.password.salt, user.password.iterations, data.password,
    );
    if (!isCorrect) {
      throw new HttpException('The password is wrong, please try again', HttpStatus.UNAUTHORIZED);
    }
    return jwt.sign({ userId: user.id }, SECRET, { expiresIn: JWT_1W });
  }

}
