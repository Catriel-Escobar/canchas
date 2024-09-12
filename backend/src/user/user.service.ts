import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { passwordEncoder } from 'src/utils/passwordEncoder';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const userFound = this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (userFound) throw new BadRequestException('User already exist');

      const user = this.userRepository.save({
        ...userData,
        password: passwordEncoder(password),
      });

      return user;
    } catch (error) {
      throw new BadRequestException(String(error));
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }

  async findOne(id: string) {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });
      if (!userFound)
        throw new BadRequestException(`User not found with id ${id}`);
      return userFound;
    } catch (error) {
      throw new InternalServerErrorException('Error searching the user');
    }
  }

  async findByEmail(email: string) {
    try {
      const userFound = await this.userRepository.findOne({ where: { email } });
      return userFound;
    } catch (error) {
      throw new InternalServerErrorException('Error searching the user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(id);
    const userUpdate = { ...user, ...updateUserDto };
    try {
      return this.userRepository.save(userUpdate);
    } catch (error) {
      throw new InternalServerErrorException('Error updating the user.');
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.isActive = false;
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error  deleting the user.');
    }
  }
}
