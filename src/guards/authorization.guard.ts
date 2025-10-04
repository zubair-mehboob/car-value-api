import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🚨 GUARD FIRED for:', context.switchToHttp().getRequest().url);

    const request = context.switchToHttp().getRequest();
    console.log('this works NOWWWWWWW', request.currentUser);
    if (request.currentUser) {
      return request.currentUser.isAdminUser;
    }
    return false;
  }
}
