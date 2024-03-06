import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/app/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const user = this.userRepository.create({
      email: createUserDto.email,
      active: true,
    });

    return await this.userRepository.save(user).catch((err: Error) => {
      throw new BadRequestException(err.message);
    });
  }

  findAll() {
    return this.userRepository.find({});
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
}
