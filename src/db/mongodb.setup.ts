import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

export const setupMongodb = () => {
  // 从configService中获取环境变量，并连接mongo
  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    // useFactory: () => {
    //   const mongooseOptions: MongooseModuleOptions = {
    //     uri: "mongodb://deploy:15935728@localhost:27017",
    //     dbName: "bill"
    //   };
    //   return mongooseOptions;
    // },
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      console.log("%c configService.get<string>(", "font-size:13px; background:pink; color:#bf2c9f;", configService.get<string>("MONGO_URI"));
      const mongooseOptions: MongooseModuleOptions = {
        uri: configService.get<string>("MONGO_URI"),
        dbName: configService.get<string>("MONGO_DB_NAME"),
        user: configService.get<string>("MONGO_USER"),
        pass: configService.get<string>("MONGO_PASS"),
        authSource: configService.get<string>("MONGO_AUTH_SOURCE")
      };
      return mongooseOptions;
    }
  });
};
