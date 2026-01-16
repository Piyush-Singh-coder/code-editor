import bcrypt, { genSalt } from "bcryptjs";
import User from "../model/user.js";
import { generateToken, sendVerificationEmail } from "../config/utils.js";
import jwt from "jsonwebtoken";

import admin from "../config/firebase.js";

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const verificationToken = generateToken(user._id, res);
    await sendVerificationEmail(user, verificationToken);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verify = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("error in verify controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { name, email, uid } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullName: name || "Google User",
        email: email,
        password: "",
        authProvider: "google",
        isVerified: true,
      });
      await user.save();
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isVerified: user.isVerified,
      message: "Google authentication successful",
    });
  } catch (error) {
    console.error("error in googleAuth controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res
        .status(200)
        .json({ message: "Please verify your email first" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("error in logout controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("error in getProfile controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
