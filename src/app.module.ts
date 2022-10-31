import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { setupMongodb } from "./db/mongodb.setup";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { JwtAuthGuard } from "./core/guards/jwt_auth.guard";
import { ClassifiesModule } from "./modules/classifies/classifies.module";
import { ValidationPipe } from "./core/pipes/validation.pipe";
import { LoggingInterceptor } from "./core/interceptor/logging.interceptor";
import { BillsModule } from "./modules/bills/bills.module";
import { AssetsModule } from "./modules/assets/assets.module";
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), setupMongodb(), UsersModule, AuthModule, ClassifiesModule, BillsModule, AssetsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard // token校验
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe // 全局使用管道(数据校验)
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor // 日志
    }
  ]
})
export class AppModule {}
