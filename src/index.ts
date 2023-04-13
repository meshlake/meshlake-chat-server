import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as jwt from 'koa-jwt';
import * as Router from 'koa-router';
import * as staticFiles from 'koa-static';
import { AppDataSource } from "./data-source"
import * as path from 'path';
// import router
import routes from './router';
// import middleware
import routerResponse from './middle/response';
// import env values.
import { FILE_UPLOAD_PATH, PORT } from './config';
import { JWT_SECRET } from './constants';
import { User } from './entity/user';

// init admin user
const initAdminUser = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { userName: 'admin' } });
  if (!user) {
    const newUser = new User();
    newUser.userName = 'admin';
    newUser.password = 'meshlake2023';
    return userRepository.save(newUser);
  }
}

// init typeorm
AppDataSource.initialize()
  .then(() => {
    return initAdminUser();
  })
  .then(res => {
    console.log('TypeORM initialize success.');
  })
  .catch(error => {
    console.error('TypeORM initialize error: ', error);
  })

// create router
const secretRouter = new Router();
const publicRouter = new Router();
routes.forEach(route => {
  if ((route as any).secret === undefined || (route as any).secret === true) {
    secretRouter[route.method](route.path, route.action);
  } else {
    publicRouter[route.method](route.path, route.action);
    console.log(route.path);
  }
});

const app = new Koa();

// open public file dir
app.use(staticFiles(path.join(FILE_UPLOAD_PATH)));
app.use(routerResponse());
app.use(koaBody());

app.use(publicRouter.routes());
app.use(publicRouter.allowedMethods());
app.use(jwt({ secret: JWT_SECRET }));
app.use(secretRouter.routes());
app.use(secretRouter.allowedMethods());

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// add a listen.
module.exports = app.listen(PORT, () => {
  console.log('server is running at http://localhost:' + PORT);
});
