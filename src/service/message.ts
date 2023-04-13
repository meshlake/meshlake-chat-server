import * as Koa from 'koa';
import { AppDataSource } from '../data-source';
import { Chat } from '../entity/chat';
import { Message } from '../entity/message';

export default class MessageService {

  async getMessageListByChatId(ctx: Koa.Context) {
    const chatId = ctx.params.chatId;
    const messageRepository = AppDataSource.getRepository(Message);
    const list = await messageRepository.find({ where: { chatId } });
    ctx.success({ count: list.length, list });
  }

  async sendMessage(ctx: Koa.Context) {
    const { name, userId } = ctx.request.body;
    const chatRepository = AppDataSource.getRepository(Chat);
    const userRepository = AppDataSource.getRepository(Message);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      ctx.fail('user not found');
      return;
    }
    const newMLChat = new Chat();
    newMLChat.name = name;
    newMLChat.userId = userId;
    const savedMLChat = await chatRepository.save(newMLChat);
    ctx.success(savedMLChat);
  }
}
