import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ISearchUserObject } from './interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userBody: User): Promise<User> {
    const user = await this.userRepository.find({ where: [
      { email: userBody.email },
      { username: userBody.username },
     ]});
    if (user.length > 0) {
      throw new HttpException('User with such creadentials already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.userRepository.create(userBody);
    return this.userRepository.save(newUser);
  }

  async get(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async search(searchObject: ISearchUserObject): Promise<User[]> {
    return this.userRepository.find({ where: searchObject });
  }

  async update(id: number, body: Partial<User>): Promise<User> {
    const user = await this.userRepository.find({ where: [
      { email: body.email },
      { username: body.username },
     ]});
    if (user.length > 0) {
      throw new HttpException('User with such creadentials already exists', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.update(id, body);
    return this.get(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
