import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    followingUser: [],
    followerUser: [],
    profile: null,
    bookmarkTweets: null,
    open: false,
    selectedUser: null,
    post: false,
    onlineUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setBookmarkTweets: (state, action) => {
      state.bookmarkTweets = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setFollowingUser: (state, action) => {
      state.followingUser = action.payload;
    },
    setFollowerUser: (state, action) => {
      state.followerUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
  
});

export const {
  setPost,
  setUser,
  setOtherUsers,
  setProfile,
  setBookmarkTweets,
  setOpen,
  setFollowingUser,
  setFollowerUser,
  setSelectedUser,
  setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;
