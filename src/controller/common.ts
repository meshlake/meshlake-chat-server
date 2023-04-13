import CommonService from '../service/common';
import * as Koa from 'koa';
/**
 * Common controller.
 * This api used for get common info, such as profile.
 */
class CommonController {
  private service: CommonService = new CommonService();

  hello = async (ctx: Koa.Context) => {
    ctx.body = await this.service.hello();
  };
}

export default new CommonController();
