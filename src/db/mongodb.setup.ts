import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

export const setupMongodb = () => {
  // 从configService中获取环境变量，并连接mongo
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: () => {
      const mongooseOptions: MongooseModuleOptions = {
        uri: "mongodb://yyh:mongodb@yyh28.top:27017",
        dbName: "bill"
      };
      return mongooseOptions;
    },
    inject: [ConfigService]
  });
};
