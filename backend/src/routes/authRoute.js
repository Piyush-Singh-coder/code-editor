import express from "express";
import {
  getProfile,
  googleAuth,
  login,
  logout,
  register,
  verify,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google-login", googleAuth);
router.post("/logout", logout);
router.post("/verify", verify);
router.get("/profile", protect, getProfile);

export default router;
