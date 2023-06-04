const { createSlice } = require("@reduxjs/toolkit");
export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
  },
  reducers: {
    allTweets: (state, actions) => {
      state.tweets = actions.payload
    }
  }
})

export const {
  allTweets
} = tweetsSlice.actions;

export default tweetsSlice.reducer;
