import {  createSlice } from "@reduxjs/toolkit";
import axios from "../config/AxiosInstance";
import Swal from "sweetalert2";
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProduct(state, { payload }) {
      state.products = payload;
    },
  },
});

// named export
export const { setProduct } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios({
        method: "GET",
        url: "/products",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
    });
console.log(data,'ini data di slice');

    dispatch(setProduct(data));
  } catch (err) {
  console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
  }
};

// export const addMovie = createAsyncThunk("movie/addMovie", async (newMovie) => {
//   const { data } = await axios({
//     method: "POST",
//     url: "/movies",
//     data: newMovie,
//   });

//   return data;
// });


export default productSlice.reducer;
