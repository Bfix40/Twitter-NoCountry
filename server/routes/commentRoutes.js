import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentByUserId,
  likeComment,
  unLikeComment,
  updateComment,
} from '../controllers/commentController.js';
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';

const commentRouter = Router();

commentRouter.get('/:id', getCommentById);
commentRouter.post('/', sessionMiddleware, createComment);
commentRouter.put('/:id', sessionMiddleware, updateComment);
commentRouter.delete('/:id', sessionMiddleware, deleteComment);
commentRouter.get('/user/:userId', getCommentByUserId);

commentRouter.post('/like/:id', sessionMiddleware, likeComment);
commentRouter.delete('/like/:id', sessionMiddleware, unLikeComment);




export default commentRouter;
