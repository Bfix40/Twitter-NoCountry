
import Retweet from '../models/Retweet.js';
import Tweet from '../models/Tweet.js';
import User from '../models/User.js';

//crear tweet
const createTweet = async (req, res) => {
  try {
    const { id } = req.user;
    const { content, hashtags } = req.body;

    const images = req.files;
    let imagePaths = [];

    if (images) {
      imagePaths = images.map((image) => {
        const imagePath = `${process.env.API_URL}/public/images/${image.filename}`;
        return imagePath;
      });
    }

    let tweet = new Tweet({
      author: id,
      content,
      hashtags,
      images: imagePaths,
    });

    await tweet.save();
    tweet = await tweet.populate('author', 'name image username email confirmed');

    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create tweet' });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByIdAndDelete(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet does not exist' });
    } else {
      res.status(200).json({ message: 'Tweet deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete tweet' });
  }
};

const getAllTweets = async (_req, res) => {
  try {
    const tweets = await Tweet.find().populate(
      'author',
      'name image username email confirmed'
    ).populate('likes retweets', 'name image username email');

    const retweets = await Retweet.find().populate({
      path: 'author',
      select: 'name image username email confirmed'
    }).populate({
      path: 'originalTweet',
      populate: {
        path: 'author likes retweets',
        select: 'name image username email confirmed'
      }
    });

    const allTweets = [...tweets, ...retweets].sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).send(allTweets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error getting all tweets' });
  }
};

const getTweetById = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId).populate(
      'author',
      'name image username email confirmed'
    ).populate('likes', 'name image username email');
    res.status(200).send(tweet);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error getting tweet' });
  }
};


//traer tweets por usuario
const getTweetsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tweets = await Tweet.find({ author: userId }).populate('author');
    res.json(tweets);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error al obtener los tweets del usuario' });
  }
};

//editar tweet
const updateTweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, hashtags } = req.body;

    const images = req.files;
    let imagePaths = [];

    if (images) {
      imagePaths = images.map((image) => {
        const imagePath = `${process.env.API_URL}/public/images/${image.filename}`;
        return imagePath;
      });
    }

    const tweet = await Tweet.findByIdAndUpdate(
      id,
      {
        content, hashtags, images: imagePaths,
      },
      { new: true }
    );

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found.' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update tweet.' });
  }
};


//like a tweet
const likeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { id } = req.user;  // Obtener el ID del usuario desde el middleware

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet no encontrado' });
    }

    // Verificar si el usuario ya dio like al tweet
    const alreadyLiked = tweet.likes.includes(id);

    if (alreadyLiked) {
      // Si ya dio like, eliminar el like
      tweet.likes = tweet.likes.filter(userId => userId.toString() !== id);
      await tweet.save();
      res.json({ message: 'Like eliminado correctamente' });
    } else {
      // Si no dio like, agregar el like
      tweet.likes.push(id);
      await tweet.save();
      res.json({ message: 'Like agregado correctamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const createRetweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { id } = req.user;  // Obtener el ID del usuario desde el middleware

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet no encontrado' });
    }

    // Verificar si el usuario ya dio retweet al tweet
    const alreadyReTweeted = tweet.retweets.includes(id);

    if (alreadyReTweeted) {
      return res.status(400).json({ message: 'El usuario ya ha retwitteado este tweet' });
    }

    // Agregar el retweet al tweet original
    tweet.retweets.push(id);
    await tweet.save();

    // Crear el retweet generado por el usuario
    const newRetweet = new Retweet({
      author: id,
      originalTweet: tweet.id
    });

    await newRetweet.save();

    return res.json({ message: 'Retweet agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


const deleteRetweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { id } = req.user;  // Obtener el ID del usuario desde el middleware

    // Eliminar el retweet del tweet original
    const tweet = await Tweet.findByIdAndUpdate(tweetId, { $pull: { retweets: id } });

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet no encontrado' });
    }

    // Eliminar el retweet generado por el usuario
    const deletedRetweet = await Retweet.findOneAndDelete({ isRetweet: true, author: id, originalTweet: tweetId });

    if (!deletedRetweet) {
      return res.json({ message: 'No se encontró el retweet generado por el usuario' });
    }

    return res.json({ message: 'Retweet eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


const getAllFollowsTweets = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).populate('following', '_id');

    const followedUserIds = user.following.map(user => user._id);

    const tweets = await Tweet.find({ author: { $in: followedUserIds } }).populate(
      'author',
      'name image username email confirmed'
    ).populate('likes retweets', 'name image username email');

    const retweets = await Retweet.find({ author: { $in: followedUserIds } }).populate({
      path: 'author',
      select: 'name image username email confirmed'
    }).populate({
      path: 'originalTweet',
      populate: {
        path: 'author likes retweets',
        select: 'name image username email confirmed'
      }
    });

    const allTweets = [...tweets, ...retweets].sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).send(allTweets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error getting all tweets' });
  }
};

const getTweetsByDate = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Si no se especifica el límite, traer 10 por defecto
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(limit);
    res.json(tweets);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error al obtener los tweets' });
  }
};

const getTopTweets = async (req, res) => {
  try {
    const topTweets = await Tweet.aggregate([
      { $unwind: "$likes" },
      { $group: { _id: "$_id", likes: { $sum: 1 } } },
      { $sort: { likes: -1 } },
      { $limit: 10 },
      { $lookup: { from: "tweets", localField: "_id", foreignField: "_id", as: "tweet" } },
      { $unwind: "$tweet" },
      { $project: { _id: "$tweet._id", content: "$tweet.content", likes: 1 } }
    ]);

    res.json(topTweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTopHashtags = async (req, res) => {
  try {
    const topHashtags = await Tweet.aggregate([
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, hashtag: "$_id", count: 1 } }
    ]);

    res.json(topHashtags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




export {
  createTweet,
  deleteTweet,
  getTweetById,
  getTweetsByUserId,
  updateTweet,
  likeTweet,
  getAllTweets,
  createRetweet,
  deleteRetweet,
  getAllFollowsTweets,
  getTweetsByDate,
  getTopTweets,
  getTopHashtags
};
