import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Check if credentials exist
if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.FIREBASE_PRIVATE_KEY
) {
  console.error("Missing Firebase service account credentials in .env");
}

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines if they exist, or use as is
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    }),
  });
  console.log("Firebase Admin Initialized successfully");
} catch (error) {
  console.error("Firebase Admin Initialization Error:", error);
}

export default admin;
