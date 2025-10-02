import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signin(dto: UserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, dbPassword] = user.password.split('.');
    const passwordHash = await this.generatePasswordHash(dto.password, salt);
    if (user.password !== passwordHash)
      throw new BadRequestException('Invalid credentials');

    return user;
  }

  async signup(dto: UserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('User already exist');
    }
    const result = await this.generatePasswordHash(dto.password);
    dto.password = result;
    const newUser = await this.userService.create(dto);
    console.log({ newUser });
    return newUser;
  }

  private async generatePasswordHash(
    password: string,
    salt: string = randomBytes(8).toString('hex'),
  ) {
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }
}
