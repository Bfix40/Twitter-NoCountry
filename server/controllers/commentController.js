import Comment from '../models/Comment.js';
import Tweet from '../models/Tweet.js';

const createComment = async (req, res) => {
  try {
    const { id } = req.user
    const { content, tweetId } = req.body;
    let newComment = new Comment({
      author: id,
      content: content,
    });
    const tweet = await Tweet.findById(tweetId);
    tweet.comments.push(newComment.id);
    await newComment.save();
    await tweet.save();
    res.status(200).send(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error creating comment' });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate('author');
    if (!comment) {
      return res.status(404).send({ message: 'Comment doesnt exists.' });
    } else {
      res.status(200).send(comment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting the comment' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const content = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(id, content, {
      new: true,
    });

    if (!updatedComment) {
      return res.status(404).send({ message: 'Comment doesnt exists.' });
    } else {
      res.status(200).send(updatedComment);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Error updating comment.' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentId } = req.body;

    const tweet = await Tweet.findById(id);

    tweet.comments = tweet.comments.filter(
      (commentsId) => commentsId.toString() !== commentId
    );

    await tweet.save()
    const updatedComment = await Comment.findByIdAndDelete(id);

    if (!updatedComment) {
      return res.status(404).send({ message: 'Comment doesnt exists.' });
    } else {
      res.status(200).send(updatedComment);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Error deleting comment.' });
  }
};

const getCommentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const comment = await Comment.find({ author: userId }).populate('author');
    if (!comment) {
      return res.status(404).send({ message: 'Comment doesnt exists.' });
    } else {
      res.status(200).send(comment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting the comment' });
  }
};

const likeComment = async(req,res) => {
  try {
    const { id } = req.user;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).send({ message: 'El comentario no existe.' });
    }
    
    const commentAlreadyLiked = comment.likes.includes(id);

    if (commentAlreadyLiked) {
      return res.status(400).json({ message: 'El usuario ya ha likeado este comentario.' });
    }
    comment.likes.push(id);
    await comment.save();
    return res.json({ message: 'Agregado like al comentario correctamente' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Error al likear comentario.' });
  }
}

const unLikeComment = async (req, res) => {
  try {
    const { id } = req.user;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).send({ message: 'El comentario no existe.' });
    }
    
    const commentAlreadyLiked = comment.likes.includes(id);

    if (!commentAlreadyLiked) {
      return res.status(400).json({ message: 'El usuario no ha likeado este comentario.' });
    }
    comment.likes = comment.likes.filter(userId => userId.toString() !== id);
    await comment.save();
    return res.json({ message: 'Eliminado like al comentario correctamente' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Error al quitar like al comentario.' });
  }
};

export {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentByUserId,
  likeComment,
  unLikeComment
};
