import * as Koa from 'koa';
import * as JWT from 'jsonwebtoken';
import { Like } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';
import { JWT_SECRET } from 'src/constants';

export default class UserService {
  /**
   * login
   */
  login = async (ctx: Koa.Context) => {
    const { userName, password } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ userName, password });
    if (user) {
      const result = {
        ...user,
        token: JWT.sign({ id: user.id }, JWT_SECRET, { expiresIn: 24 * 60 * 60 })
      };
      ctx.success(result, 'success!');
    } else {
      ctx.fail('login failed！', -1);
    }
  };

  /**
   * logout
   */
  logout = async (ctx: Koa.Context) => {
    ctx.success({}, 'success!');
  };

  /**
   * Get user list info.
   * Contains paging,fuzzy search
   * More typeorm usage you can go to https://typeorm.bootcss.com/find-options
   */
  getUsers = async (ctx: Koa.Context) => {
    const query = ctx.request.query;
    const page = query.page ? +query.page : 1;
    const pageSize = query.pageSize ? +query.pageSize : 10;
    const searchWord = query.searchWord;
    const pageStart = pageSize * (page - 1);
    const userRepository = AppDataSource.getRepository(User);
    const [result, resultCount] = await userRepository.findAndCount({
      skip: pageStart,
      take: pageStart + pageSize,
      where: searchWord ? { userName: Like(`%${searchWord}%`) } : null
    });
    if (result) {
      ctx.success({ count: resultCount, list: result }, 'success!');
    } else {
      ctx.fail('query user failed！', -1);
    }
  };

  /**
   * get user info
   */
  getUser = async (ctx: Koa.Context) => {
    const id = ctx.params.id;
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.findOne({ where: { id}});
    if (result) {
      ctx.success({...result}, 'success!');
    } else {
      ctx.fail('query user failed！', -1);
    }
  };

  /**
   * Create new user
   */
  createUser = async (ctx: Koa.Context) => {
    const userInfo = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.insert({
      ...userInfo,
    });
    if (result) {
      ctx.success({}, 'create success!');
    } else {
      ctx.fail('create user failed！', -1);
    }
  };

  /**
   * Delete user by id
   */
  deleteUser = async (ctx: Koa.Context) => {
    const id = ctx.params.id;
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    if (result) {
      ctx.success({}, 'delete success!');
    } else {
      ctx.fail('delete user failed！', -1);
    }
  };

  /**
   * update user by id
   */
  updateUser = async (ctx: Koa.Context) => {
    const id = ctx.params.id;
    const userInfo = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.update(id, {
      ...userInfo,
      updateTime: new Date(),
    });
    if (result) {
      ctx.success({}, 'update success!');
    } else {
      ctx.fail('update user failed！', -1);
    }
  };

  /**
   * Update user password.
   * First check old password , if correct will be change password.
   */
  updatePassword = async (ctx: Koa.Context) => {
    const id = ctx.params.id;
    const { oldPassword, newPassword } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const [ result, resultCount ] = await userRepository.find({
      where: {
        id,
        password: oldPassword
      }
    })
    if (result) {
      const newUser = {
        ...result,
        password: newPassword,
        updateTime: new Date(),
      };
      const updateResult = await userRepository.save(newUser);
      if (updateResult) {
        ctx.success({}, 'update password success!');
      } else {
        ctx.fail('update password failed！', -1);
      }
    } else {
      ctx.fail('old password check failed！', -1);
    }
  };
}
