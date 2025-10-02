import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  const users: User[] = [];
  const fakeUserService: Partial<UserService> = {
    findById: function (id: number): Promise<User> {
      return Promise.resolve(users.find((user) => user.id === id));
    },
    findByEmail: function (email: string): Promise<User> {
      return Promise.resolve(users.find((user) => user.email === email));
    },

    find: function (): Promise<User[]> {
      return Promise.resolve(users);
    },

    update: function (id: number, dto: Partial<User>): Promise<User> {
      const index = users.findIndex((user) => user.id === id);
      Object.assign(users[index], dto);
      return Promise.resolve(users[index]);
    },
    remove: function (id: number): Promise<User> {
      const index = users.findIndex((user) => user.id === id);
      const user = users[index];
      users.splice(index, 1);
      return Promise.resolve(user);
    },
  };
  const fakeAuthService: Partial<AuthService> = {
    signin: function (dto: UserDto): Promise<User> {
      throw new Error('Function not implemented.');
    },
    signup: async function (dto: UserDto): Promise<User> {
      const user = await fakeUserService.findByEmail(dto.email);
      if (user) {
        throw new BadRequestException('User already exist');
      }
      const result = await this.generatePasswordHash(dto.password);
      dto.password = result;
      return this.userService.create(dto);
    },
  };
  beforeEach(async () => {
    const module = Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = (await module).get(UserController);
  });

  it('can create an instance of UserController', () => {
    expect(controller).toBeDefined();
  });

  it('can signup user', async () => {
    const user = await fakeAuthService.signup({
      email: 'abc@y.c',
      password: '12345',
    });
  });
});
