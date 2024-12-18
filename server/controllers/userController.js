import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/generateToken.js";
import {Profile} from '../models/profile.js'; // Import the Profile model

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

// Get the user's profile
export const getUserProfileInfo = async (req, res) => {
  try {
      const { userId } = req.params; // Extract the logged-in user's ID from the authentication middleware

      // Find the profile associated with the logged-in user
      const profile = await Profile.findOne({ userId });

      if (!profile) {
          return res.status(404).json({ success: false, message: 'Profile not found' });
      }

      res.status(200).json({
          success: true,
          message: 'Profile retrieved successfully',
          profile,
      });
  } catch (error) {
      console.error('Error retrieving profile:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to retrieve profile',
          error: error.message,
      });
  }
};

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

export const createProfile = async (req, res) => {
  try {
    const {userId} =req.params;
      const { phoneNo, githubUrl, linkedinUrl, aboutUs, skills, dob, codingProfiles } = req.body;

      // Validate request body
      if (!userId || !phoneNo || !githubUrl || !linkedinUrl || !skills || !dob) {
          return res.status(400).json({ message: "All required fields must be provided" });
      }

      // Create new profile
      const newProfile = new Profile({
          userId,
          phoneNo,
          githubUrl,
          linkedinUrl,
          aboutUs,
          skills,
          dob,
          codingProfiles
      });

      await newProfile.save();
      res.status(201).json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Update a profile (only by the logged-in user)
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.user; // Extract the logged-in user's ID from the authentication middleware
        const updates = req.body; // Extract the fields to update from the request body

        // Validate input
        if (!userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized: User ID missing' });
        }

        // Find the profile associated with the logged-in user
        const profile = await Profile.findOne({ _id: req.params.profileId, userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found or not owned by user' });
        }

        // Apply updates
        Object.assign(profile, updates);

        // Save updated profile
        const updatedProfile = await profile.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            profile: updatedProfile,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message,
        });
    }
};

