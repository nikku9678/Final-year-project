import express from 'express';

import { getUserProfile, login, register,logout,createProfile, updateProfile, getUserProfileInfo} from '../controllers/userController.js';
import { isAuthenticate } from '../middlewares/auth.js';

const router = express.Router();



// user routes
router.post("/login",login);
router.get("/logout",logout);
router.post("/register",register);
router.get("/profile",isAuthenticate,getUserProfile);
router.post("/create-profile/:userId",isAuthenticate,createProfile);
router.get("/profileInfo/:userId",isAuthenticate,getUserProfileInfo);

router.put('/profiles/:profileId', isAuthenticate, updateProfile);

export default router;