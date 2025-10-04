import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: any, res: any, next: (error?: Error | any) => void) {
    const id = req.session.userId || {};
    if (id) {
      const user = await this.userService.findById(id);
      req.currentUser = user;
    }
    next();
  }
}
