import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/generateToken.js";

// Login
export const login = catchAsyncErrors(async (req, res, next) => {
    const { login, password } = req.body; // 'login' can be email or username
  
    if (!login || !password) {
      return next(new ErrorHandler("Please provide login (username or email) and password!", 400));
    }
  
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    }).select("+password");
  
    if (!user || !(await user.comparePassword(password))) {
      return next(new ErrorHandler("Invalid Username/Email or Password!", 400));
    }
  
    generateToken(user, "Login Successful!", 200, res);
  });
  

// Register
export const register = catchAsyncErrors(async (req, res, next) => {

  const { fullname, username, email, password } = req.body;
    console.log(username);
  if (!fullname || !username || !email || !password) {
    return next(new ErrorHandler("Please fill all fields!", 400));
  }

  // Check if username or email is already registered
  const isEmailRegistered = await User.findOne({ email });
  const isUsernameRegistered = await User.findOne({ username });
  if (isEmailRegistered) {
    return next(new ErrorHandler("Email is already registered!", 400));
  }
  if (isUsernameRegistered) {
    return next(new ErrorHandler("Username is already taken!", 400));
  }

  const user = await User.create({
    fullname,
    username,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully!",
    user,
  });
});

// Get User Profile
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logged Out Successfully.",
    });
});

// Get User by ID
export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID or User not found!", 400));
  }
});
