import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";
interface State {
  currentUser: string;
  loading: boolean;
  error: boolean;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "",
    loading: false,
    error: false,
  },  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerRedux.pending, (state: State, action) => {
        state.loading = true;
      })
      .addCase(registerRedux.fulfilled, (state: State, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      });
  },
});
export const registerRedux = createAsyncThunk(
  "auth/register",
  async ({
    phoneNumber,
    password,
  }: {
    phoneNumber: string;
    password: string;
  }) => {
    try {
      await axios
        .post("http://localhost:8000/api/v1/users/register", {
          phoneNumber,
          password,
        })
        .then((response) => {
          if (response.data.status === 201) {
            notification.success({
              message: "Đăng ký thành công",
            });
            return "";
          } else if (response.data.status === "existed") {
            notification.error({
              message: "Số điện thoại đã tồn tại",
            });
          }
        })
        .catch((error) => {
          console.error("Đăng ký thất bại");
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
    return "";
  }
);
export default authSlice.reducer;
