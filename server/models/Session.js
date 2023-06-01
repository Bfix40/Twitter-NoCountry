import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
