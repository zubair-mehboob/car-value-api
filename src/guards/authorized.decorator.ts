// authorized.decorator.ts (Revised)
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';

export function Authorized() {
  return applyDecorators(
    UseGuards(AuthorizationGuard), // Order is crucial!
  );
}
