const { createSlice } = require("@reduxjs/toolkit");
const { initialState } = require("@/data/tweets.js");

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: initialState,
    auxTweets: initialState
  },
  reducers: {
    allTweets: (state, actions) => {
      state.tweets = actions.payload
      state.auxTweets = actions.payload
    }
  }
})

export const {
  allTweets
} = tweetsSlice.actions;

export default tweetsSlice.reducer;
