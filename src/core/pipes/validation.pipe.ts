import { ArgumentMetadata, PipeTransform, Injectable, Type } from "@nestjs/common";
import { CustomerException } from "../exceptions/customer.exception";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // 如果参数不是 类 而是普通的 JavaScript 对象则不进行验证
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 通过元数据和对象实例，去构建原有类型
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const message: string[] = [];
      errors.map(item => {
        for (const key in item.constraints) {
          message.push(item.constraints[key]);
        }
      });
      throw new CustomerException(1, message.join(","));
    }

    return value;
  }

  private toValidate(metatype: Type<any> | StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor | ObjectConstructor): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
