import Comment from '../models/Comment.js';

const createComment = async (req, res) => {
  try {
    const { id } = req.user
    const { content } = req.body;
    let newComment = new Comment({
      author: id,
      content: content,
    });
    await newComment.save();
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

export {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentByUserId,
};
