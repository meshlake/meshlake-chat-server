import * as Koa from 'koa';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';
import { Chat } from '../entity/chat';

export default class ChatService {

  async getChatList(ctx: Koa.Context) {
    const userId = ctx.state.user.id;
    const chatRepository = AppDataSource.getRepository(Chat);
    const list = await chatRepository.find({ where: { userId }, order: { createTime: 'DESC' } });
    ctx.success({ count: list.length, list });
  }

  async createChat(ctx: Koa.Context) {
    const userId = ctx.state.user.id;
    const { name } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const chatRepository = AppDataSource.getRepository(Chat);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      ctx.fail('user not found');
      return;
    }
    const newChat = new Chat();
    newChat.name = name;
    newChat.userId = userId;
    const savedMLChat = await chatRepository.save(newChat);
    ctx.success(savedMLChat);
  }

  async deleteChat(ctx: Koa.Context) {
    const id = ctx.params.id;
    const chatRepository = AppDataSource.getRepository(Chat);
    const result = await chatRepository.delete(id);
    if (result) {
      ctx.success({}, 'delete success!');
    } else {
      ctx.fail('delete failed！', -1);
    }
  }

  async updateChat(ctx: Koa.Context) {
    const id = ctx.params.id;
    const name = ctx.request.body.name;
    const chatRepository = AppDataSource.getRepository(Chat);
    const result = await chatRepository.update(id, {
      name,
      updateTime: new Date()
    });
    if (result) {
      ctx.success({}, 'update success!');
    } else {
      ctx.fail('update failed！', -1);
    }
  }
}
