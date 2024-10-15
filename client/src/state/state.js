import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {
    _id: null,
    friends: [],
    role: "",
    favorites: [],
    fullName: "",
    picturePath: "",
  },
  token: null,
  posts: [],
  activities: [],
  hotels: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      const { user, token } = action.payload;
      state.user = {
        _id: user._id,
        friends: user.friends,
        role: user.role,
        favorites: user.favorites,
        fullName: user.fullName,
        picturePath: user.picturePath,
      };
      state.token = token;
    },
    setLogout: (state) => {
      state.user = { _id: null, friends: [], role: "", favorites: [] };
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
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
    },
    setActivities: (state, action) => {
      state.activities = action.payload.map((activity) => ({
        ...activity,
        favoritedBy: activity.favoritedBy || [],
      }));
    },
    setActivity: (state, action) => {
      const updatedActivity = action.payload.activity;
      state.activities = state.activities.map((activity) =>
        activity._id === updatedActivity._id ? updatedActivity : activity
      );
    },
    removeActivity: (state, action) => {
      state.activities = state.activities.filter(
        (activity) => activity._id !== action.payload.activityId
      );
    },
    setFavorites: (state, action) => {
      if (state.user) {
        state.user.favorites = action.payload;
      } else {
        console.error("User does not exist");
      }
    },
    addFavoriteToActivity: (state, action) => {
      const { activityId, userId } = action.payload;
      state.activities = state.activities.map((activity) =>
        activity._id === activityId
          ? { ...activity, favoritedBy: [...activity.favoritedBy, userId] }
          : activity
      );
    },
    removeFavoriteFromActivity: (state, action) => {
      const { activityId, userId } = action.payload;
      state.activities = state.activities.map((activity) =>
        activity._id === activityId
          ? {
              ...activity,
              favoritedBy: activity.favoritedBy.filter((id) => id !== userId),
            }
          : activity
      );
    },
    setHotels: (state, action) => {
      state.hotels = action.payload.map((hotel) => ({
        ...hotel,
      }));
    },
    deleteHotel: (state, action) => {
      state.activities = state.hotels.filter(
        (hotel) => hotel._id !== action.payload.hotelId
      );
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload.map((restaurant) => ({
        ...restaurant,
      }));
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
  setHotels,
  setRestaurants,
  deleteHotel,
  removeActivity,
  setFavorites,
  addFavoriteToActivity,
  removeFavoriteFromActivity,
} = authSlice.actions;

export default authSlice.reducer;
