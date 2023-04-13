import commonController from '../controller/common';
import userRouters from './user';
import chatRouters from './chat';

export default [
  ...userRouters,
  ...chatRouters,
  {
    path: '/',
    method: 'get',
    secret: false,
    action: commonController.hello
  },
];
