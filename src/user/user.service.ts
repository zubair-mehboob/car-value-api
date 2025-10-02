import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
export interface IRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  find(): Promise<User[]>;
  create(dto: Partial<User>): Promise<User>;
  update(id: number, dto: Partial<User>): Promise<User>;
  remove(id: number): Promise<User>;
}
/**
 * Steps to inject typeorm entity repository
 * 1-> import Repository from typeorm import { Repository } from 'typeorm';
 * 2-> import InjectRepository from @nestjs/typeorm import { InjectRepository } from '@nestjs/typeorm';
 * 3-> import an entity User, Report etc, here I'm importing User entity as I'm in User service import { User } from './user.entity';
 * 4-> Repository is generic which takes entity in angle bracket like this Repository<User>
 *  InjectRepository is a decorator which takes entity in argument @InjectRepository(User)
 * your constructor will look like this constructor(@InjectRepository(User) private repo: Repository<User>){}
 */

@Injectable()
export class UserService implements IRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async findById(id: number): Promise<User> {
    if (!id) throw new NotFoundException('user not found');
    return this.repo.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }
  async find(): Promise<User[]> {
    return this.repo.find();
  }
  async create(dto: Partial<User>): Promise<User> {
    const user = this.repo.create(dto);
    const newUser = await this.repo.save(user);
    console.log({ newUser }, 'new user created');
    return newUser;
  }
  async update(id: number, dto: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, dto);
    this.repo.save(user);

    return user;
  }
  async remove(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user); //will trigger hook @AfterRemove
    //this.repo.delete(id) will not trigger hook
  }
}
