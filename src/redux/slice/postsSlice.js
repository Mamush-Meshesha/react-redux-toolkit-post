import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import apiURL from "./../../utils/apiURL.js";
import axios from "axios";
// initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

//actions
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get(apiURL);
  return res.data;
});

//fetch single post
export const searchPost = createAsyncThunk("posts/searchPost", async (id,state, action) => {
try {
    const res = await axios.get(`${apiURL}/${id}`);
    return res.data;
} catch (error) {
  console.log(error)
}
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    //handle actions

    //pending
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });
    //fulfiled
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    //rejected
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });

    // search handler

    //pending
    builder.addCase(searchPost.pending, (state, action) => {
      state.loading = true

    })

    // fillfilled
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.loading = false
      state.posts = [action.payload]
    })

    //rejected
    builder.addCase(searchPost.rejected, (state, action) => {
      state.loading = false
      state.posts= []
      state.error = action.payload
    })
  },
});

//generate reducers

const postsReducer = postsSlice.reducer;

export default postsReducer;
