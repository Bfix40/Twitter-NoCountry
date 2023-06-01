import mongoose, { Mongoose } from 'mongoose';
const likeSchema = new Mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tweet'
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;