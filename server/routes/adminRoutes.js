import express from 'express'

import { getAllUsers } from "../controllers/adminController.js";
import { isAdmin, isAuthenticate } from "../middlewares/auth.js";


const router = express.Router();


router.get("/admin/users", isAuthenticate, isAdmin, getAllUsers);



export default router;