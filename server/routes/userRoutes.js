import express from 'express';

import { getUserProfile, login, register,logout} from '../controllers/userController.js';
import { isAuthenticate } from '../middlewares/auth.js';

const router = express.Router();


// user routes
router.post("/login",login);
router.get("/logout",logout);
router.post("/register",register);
router.get("/profile",isAuthenticate,getUserProfile);


export default router;