import userController from '../controller/user';

export default [
  {
    path: '/api/user/login',
    method: 'post',
    secret: false,
    action: userController.login
  },
  {
    path: '/api/user/logout',
    method: 'post',
    secret: true,
    action: userController.logout
  },
  {
    path: '/api/user/:id',
    method: 'get',
    action: userController.getUser
  },
  {
    path: '/api/user/:id',
    method: 'delete',
    action: userController.deleteUser
  },
  {
    path: '/api/user/:id',
    method: 'put',
    action: userController.updateUser
  },
  {
    path: '/api/user/password/:id',
    method: 'put',
    action: userController.updatePassword
  },
  {
    path: '/api/users',
    method: 'get',
    action: userController.getUsers
  },
];
