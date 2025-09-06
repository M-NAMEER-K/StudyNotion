import {createSlice} from "@reduxjs/toolkit"

let userData = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    userData = JSON.parse(storedUser);
  }
} catch (err) {
  console.error("Error parsing user from localStorage:", err);
  localStorage.removeItem("user"); // cleanup bad value
}

const initialState = {
  user: userData,
  loading: false,
};
const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;