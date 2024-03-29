import { Module } from "@nestjs/common";
import { setupMongodb } from "./db/mongodb.setup";
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { JwtAuthGuard } from "./core/guards/jwt_auth.guard";
import { setupConfig } from "./config/config.setup";
import { ValidationPipe } from "./core/pipes/validation.pipe";
import { LoggingInterceptor } from "./core/interceptor/logging.interceptor";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ClassifiesModule } from "./modules/classifies/classifies.module";
import { BillsModule } from "./modules/bills/bills.module";
import { AssetsModule } from "./modules/assets/assets.module";
import { RemindersModule } from "./modules/reminders/reminders.module";
import { WeChatMessageModule } from "./modules/weChatMessage/weChatMessage.module";
@Module({
  imports: [
    // config
    setupConfig(),
    setupMongodb(),
    UsersModule,
    AuthModule,
    ClassifiesModule,
    BillsModule,
    AssetsModule,
    RemindersModule,
    WeChatMessageModule
  ],
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
