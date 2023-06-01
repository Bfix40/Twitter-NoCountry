import { Router } from 'express';
import {
  createTweet,
  deleteTweet,
  getTweetById,
  createRetweet,
  deleteRetweet,
  getTweetsByUserId,
  updateTweet,
  likeTweet,
  getAllTweets,
  getAllFollowsTweets,
  getTweetsByDate,
  getTopTweets,
  getTopHashtags
} from '../controllers/tweetController.js';
import upload from '../middlewares/multer.js';
import { sessionMiddleware } from '../middlewares/sessionMiddleware.js';

const tweetRouter = Router();

tweetRouter.get('/all', getAllTweets);
tweetRouter.get('/tweetsByDate', getTweetsByDate);
tweetRouter.get('/topTweets', getTopTweets);
tweetRouter.get('/topHashtags', getTopHashtags)
tweetRouter.get('/allFollowed', sessionMiddleware, getAllFollowsTweets)

tweetRouter.get('/user/:userId', getTweetsByUserId);

tweetRouter.post('/create', [sessionMiddleware, upload.array('images')], createTweet);
tweetRouter.get('/:id', getTweetById);
tweetRouter.put('/:id', [sessionMiddleware, upload.array('images')], updateTweet);
tweetRouter.delete('/:id', sessionMiddleware, deleteTweet);

tweetRouter.post('/retweet/:id', sessionMiddleware, createRetweet);
tweetRouter.delete('/retweet/:id', sessionMiddleware, deleteRetweet);

tweetRouter.put('/like/:id', sessionMiddleware, likeTweet);


export default tweetRouter;
