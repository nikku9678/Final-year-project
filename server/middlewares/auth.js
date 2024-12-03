import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const isAuthenticate =async (req,res,next) =>{
    const { token } = req.cookies;
  
    if (!token) {
      return res.status(400).send({ success: false, message: "Login First." });
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
     req.user = await User.findById(decode.id);
     next();
}