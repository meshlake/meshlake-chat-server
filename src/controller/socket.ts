import * as Koa from 'koa';
import WebSocketService from '../service/socket';
/**
 * WebSocket Controller.
 * For client/server both-way communication.
 */
class WebSocketController {
  private service: WebSocketService = new WebSocketService();

  getTest = async (ctx: Koa.Context) => {
    await this.service.getTest(ctx);
  };
}

export default new WebSocketController();
