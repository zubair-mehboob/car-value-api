import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';
import { expand } from 'rxjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { emit } from 'process';
let service: AuthService;
let FakeUserService: Partial<UserService>;
const testUser = {
  email: 'ab@y.co',
  password: 'abc',
} as User;
describe('AuthService', () => {
  beforeEach(async () => {
    const users: User[] = [];
    /*
        create temporary testing DI container because there are dependencies
        AuthService needs UserService, UserService needs User Repo
        */

    //Create a fake copy of UserService
    FakeUserService = {
      findByEmail: (email: string) => {
        const user = users.find((user) => user.email === email);
        return Promise.resolve(user);
      },
      //   findByEmail: (email: string) => Promise.resolve({ email } as User),
      create: (dto: Partial<User>) => {
        const user = {
          id: Math.round(Math.random()),
          email: dto.email,
          password: dto.password,
        } as User;
        users.push(user);
        return user;
      },
    };

    //Create testing module
    const module = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: FakeUserService,
        },
      ],
    }).compile();

    service = (await module).get(AuthService);
  });
  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('create a user with hashed pasword', async () => {
    const user: Partial<User> = await service.signup({
      email: 'pqr@y.c',
      password: 'asd123',
    });
    expect(user.password).not.toEqual('asd123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error that email already in use', async () => {
    await service.signup({ email: 'ab@y.co', password: 'abc' } as User);
    const user = service.signup({
      email: 'ab@y.co',
      password: 'abc',
    } as User);
    expect(user).rejects.toThrow(BadRequestException);
  });

  it('throws an error if user not found', async () => {
    await service.signup({
      email: 'ab@y.co',
      password: 'abc',
    } as User);
    const user = service.signin({
      email: 'ab1@y.co',
      password: 'abc',
    } as User);
    /**
 * Use await expect(promise).rejects... when testing async errors.

Use await expect(promise).resolves... when testing async success.
 */
    await expect(user).rejects.toThrow(NotFoundException);
  });

  it('throws when an invalid password is provided', async () => {
    await service.signup({
      email: 'ab@y.co',
      password: 'abc',
    } as User);
    const user = service.signin({
      email: 'ab@y.co',
      password: 'abc1',
    } as User);
    await expect(user).rejects.toThrow(BadRequestException);
  });

  it('signin user successfully when correct password is provided', async () => {
    await service.signup({ email: 'ab@y.c', password: 'password' });

    const user = await service.signin({
      email: 'ab@y.c',
      password: 'password',
    });
    expect(user).toBeDefined();
  });
});
