import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    allTweets: [],
    profileTweets: [],
    followingTweets: [],
    singleTweets: [],
    totalTweets: [],
    refresh: true,
    following: false,
    comment: false,
  },
  reducers: {
    setAllTweets: (state, action) => {
      state.allTweets = action.payload;
    },

    setFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },

    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setSingleTweets: (state, action) => {
      state.singleTweets = action.payload;
    },
    setTotalTweets: (state, action) => {
      state.totalTweets = action.payload;
    },
    setprofileTweets: (state, action) => {
      state.profileTweets = action.payload;
    },
  },
  
});

export const {
  setAllTweets,
  setFollowingTweets,
  setRefresh,
  setFollowing,
  setComment,
  setSingleTweets,
  setTotalTweets,
  setprofileTweets,
} = tweetSlice.actions;
export default tweetSlice.reducer;
