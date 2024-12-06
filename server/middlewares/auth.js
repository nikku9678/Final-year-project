import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';


// Middleware to verify admin role
export const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
  next();
};



export const isAuthenticate = async (req, res, next) => {
  // Retrieve the Authorization header
  const authHeader = req.headers['authorization'];
  
  // Check if the header exists and starts with "Bearer"
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(400).send({ success: false, message: "Token is missing. Please log in." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the decoded ID
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).send({ success: false, message: "User not found." });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).send({ success: false, message: "Invalid or expired token." });
  }
};
