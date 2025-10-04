import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
interface ClassConstructor<T> {
  new (...args: any[]): T;
}
export class ResponseInterceptor<T> implements NestInterceptor {
  constructor(private res: ClassConstructor<T>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return { data, isOk: true };
      }),
    );
  }
}
