import * as Koa from 'koa';
import ChatService from '../service/chat';

/**
 * User controller.
 * This api used for CURD to user info.
 */
class ChatController {
  private service: ChatService = new ChatService();

  getChatList = async (ctx: Koa.Context) => {
    await this.service.getChatList(ctx);
  };
  createChat = async (ctx: Koa.Context) => {
    await this.service.createChat(ctx);
  };
  deleteChat = async (ctx: Koa.Context) => {
    await this.service.deleteChat(ctx);
  };
  updateChat = async (ctx: Koa.Context) => {
    await this.service.updateChat(ctx);
  };
}

export default new ChatController();
