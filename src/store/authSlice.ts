import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const baseURL = "https://localhost:3000" as string;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error while fetching data");
      }
    }
  }
);

// Register action
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data();
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data ?? "Registration failed"
      );
    }
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  auth: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
