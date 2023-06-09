import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
},  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;