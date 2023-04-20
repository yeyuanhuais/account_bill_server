import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CustomerException } from "src/core/exceptions/customer.exception";
import { encryptPassword, makeSalt } from "src/utils/cryptogram";
import { CreateUserDto } from "./dto/create_user.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { WxCreateUserDto } from "./dto/wx_create_user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("Users") private readonly usersModel: Model<UserDocument>, private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.usersModel(createUserDto);
    return createUser.save();
  }

  async findAll(query: { pageSize: number; pageNum: number }): Promise<User[]> {
    const users = await this.usersModel
      .find()
      .skip(query.pageSize * query.pageNum)
      .limit(query.pageSize)
      .sort({ _id: -1 })
      .exec();
    return users;
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.usersModel.findById(id);
    return user;
  }
  async findOne(query: object): Promise<User | null> {
    const user = await this.usersModel.findOne(query);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const modifyUser = await this.usersModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateUserDto);
    return modifyUser;
  }

  async remove(id: number) {
    await this.usersModel.findByIdAndDelete(id);
    return `This action removes a #${id} user`;
  }

  async register(body: any): Promise<any> {
    const { account, password, rePassword } = body;
    if (password !== rePassword) {
      throw new CustomerException(1, "两次密码输入不一致");
    }
    const user = await this.findOne({ account });
    if (user && Object.keys(user).length !== 0) {
      throw new CustomerException(1, "用户已存在");
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    try {
      await this.create({ ...body, password: hashPwd, salt });
    } catch (error) {
      throw new CustomerException(2, error);
    }
    return;
  }
  /**
   * @description
   * @param { Boolean }
   * @return { Boolean }
   */
  async wxRegister(body: WxCreateUserDto): Promise<any> {
    const password = "Aa123456";
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    try {
      const createUser = new this.usersModel({
        ...body,
        password: hashPwd,
        salt,
        login_method: "weixin"
      });
      return createUser.save();
    } catch (error) {
      throw new CustomerException(2, error);
    }
  }
  /**
   * @description 微信登录获取openid
   * @param { string } code
   * @return { object } {openid session_key}
   */
  async weixinLogin(code: string): Promise<any> {
    const res = await axios.get("https://api.weixin.qq.com/sns/jscode2session", {
      params: { appid: this.configService.get<string>("appid"), secret: this.configService.get<string>("secret"), js_code: code, grant_type: "authorization_code" }
    });
    if (res.data.errcode === 40029) {
      throw new CustomerException(3, "登录凭证无效");
    } else if (res.data.errcode === 45011) {
      throw new CustomerException(1, "调用太频繁，请稍候再试");
    } else if (res.data.errcode === 40226) {
      throw new CustomerException(1, "高风险等级用户，小程序登录拦截 ");
    } else if (res.data.errcode === -1) {
      throw new CustomerException(1, "系统繁忙，请稍候再试 ");
    } else if (res.data.errcode) {
      throw new CustomerException(1, res.data.errmsg);
    }
    return res.data;
  }

}
