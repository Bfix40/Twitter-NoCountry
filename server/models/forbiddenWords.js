import mongoose from "mongoose";

const forbiddenWordsSchema = new mongoose.Schema({
  words: { type: [String], default: [] },
})

const ForbiddenWords = mongoose.model('ForbiddenWords', forbiddenWordsSchema)

export default ForbiddenWords;