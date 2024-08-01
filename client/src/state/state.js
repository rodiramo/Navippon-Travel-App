import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: { _id: null, friends: [], role: '' },
  token: null,
  posts: [],
  activities: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = { _id: null, friends: [], role: '' };
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User does not exist");
      }
    },
    setPosts: (state, action) => {
      const postsWithAuthor = action.payload.posts.map((post) => ({
        ...post,
        author: post.userId,
      }));
      state.posts = postsWithAuthor;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return {
            ...action.payload.post,
            author: action.payload.post.userId,
          };
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setActivity: (state, action) => {
      const updatedActivities = state.activities.map((activity) => {
        if (activity._id === action.payload.activity._id) {
          return {
            ...action.payload.activity,
          };
        }
        return activity;
      });
      state.activities = updatedActivities;
    },
    removeActivity: (state, action) => {
      state.activities = state.activities.filter((activity) => activity._id !== action.payload.activityId);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPost,
  setPosts,
  removePost,
  setActivities,
  setActivity,
  removeActivity,
} = authSlice.actions;

export default authSlice.reducer;
