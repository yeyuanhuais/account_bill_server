import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码
    // 设置错误信息
    const message = exception.message ? exception.message : `${status >= 500 ? "Service Error" : "Client Error"}`;
    const errorResponse = exception instanceof HttpException ? exception.getResponse() : { code: -1, message }; // 获取异常数据

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
