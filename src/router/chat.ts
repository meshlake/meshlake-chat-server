import chatController from '../controller/chat';

export default [
  {
    path: '/api/chat/list',
    method: 'get',
    action: chatController.getChatList
  },
  {
    path: '/api/chat',
    method: 'post',
    action: chatController.createChat
  },
  {
    path: '/api/chat/:id',
    method: 'put',
    action: chatController.updateChat
  },
  {
    path: '/api/chat/:id',
    method: 'delete',
    action: chatController.deleteChat
  },
];
