import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures username is unique
    trim: true,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    lowercase: true, // Converts email to lowercase
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false, // Excludes password from query results
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JSON Web Token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
