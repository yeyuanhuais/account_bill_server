import { ConfigModule } from "@nestjs/config";

console.log("%c process.env.NODE_ENV", "font-size:13px; background:pink; color:#bf2c9f;", process.env.NODE_ENV);
// 根据 NODE_ENV 读取环境变量文件
export const envFilePath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

// 封装 setupConfig 方法，configModule 的配置将在此处完成
export const setupConfig = () => {
  return ConfigModule.forRoot({ envFilePath, isGlobal: true, cache: true });
};
