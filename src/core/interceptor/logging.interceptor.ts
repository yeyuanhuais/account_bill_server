import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common";
import dayjs from "dayjs";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    return next.handle().pipe(
      tap(() => {
        const time = dayjs().diff(now);
        Logger.log(`${method} ${url} ${time}ms`, context.getClass().name);
      })
    );
  }
}
