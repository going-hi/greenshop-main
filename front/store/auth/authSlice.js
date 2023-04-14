import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/axios";

export const fetchRegister = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await instance.post("/api/auth/registration", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await instance.post("/api/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await instance.get("/api/auth/refresh");
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.refected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.refected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.refected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
