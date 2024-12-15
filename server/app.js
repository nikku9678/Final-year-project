import express from 'express'
import dotenv from 'dotenv';
import {connectDb} from './config/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import discussionRoutes from "./routes/discussionRoutes.js";
import { isAuthenticate } from './middlewares/auth.js';

const app =express(); 

dotenv.config();
connectDb();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Frontend origin
    credentials: true,
  })
);

  // app.use(cors())
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/u", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", mcqRoutes);
app.use("/api/v1", discussionRoutes);

app.get('/protected', isAuthenticate, (req, res) => {
  
  res.send({ success: true, message: "Access granted to protected route", user: req.user });
});


app.use(errorMiddleware);
const PORT = 4000 || process.env.PORT

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


