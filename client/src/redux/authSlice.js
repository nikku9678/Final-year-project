import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Load state from localStorage
    user: JSON.parse(localStorage.getItem("user")) || null, // Load user data from localStorage
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = {
                id: action.payload._id, // Save only necessary user data
                name: action.payload.fullname, // Mask other sensitive information if needed
                email: action.payload.email, // Mask other sensitive information if needed
                isAdmin: action.payload.isAdmin, // Mask other sensitive information if needed
                token: action.payload.token, // Mask other sensitive information if needed
                username: action.payload.username,
            };
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(state.user)); // Save user data to localStorage without password
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("user"); // Remove user data from localStorage
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
