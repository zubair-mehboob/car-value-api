import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

import { UserResponseDto } from './dto/user-response.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { Authenticated } from '../decorators/auth.decorator';

export interface ISession {
  userId: number;
}

@Controller('auth')
@Serialize(UserResponseDto)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  async signin(@Body() dto: UserDto, @Session() session: ISession) {
    const user = await this.authService.signin(dto);
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async signup(@Body() dto: UserDto, @Session() session: ISession) {
    const user = await this.authService.signup(dto);
    session.userId = user.id;
    return user;
  }
  //option 1
  // @UseGuards(AuthGuard)
  @Authenticated()
  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }
  @Post('signout')
  signout(@Session() session: ISession) {
    session.userId = null;
    return 'signout successfully';
  }
  @Get()
  getAll() {
    return this.userService.find();
  }
  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch('/:id')
  patchUserById(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
