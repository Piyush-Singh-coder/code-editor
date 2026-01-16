import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '2d',
    })

    res.cookie('jwt', token,{
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    })
    return token;
}


export const sendVerificationEmail = async (user,token) => {
    // Create transporter object using your email service provider's SMTP settings

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"Horizon Editor" <noreply@myapp.com>',
        to: user.email,
        subject: "Email Verification",
        html: `
        <h1>Welcome to Horizon Editor!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify Email</a>
        <p> This link will expire in 24 hours.</p>
        <h3> Thank you!</h3>
        `
    };
    await transporter.sendMail(mailOptions);
}


// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyCBMabBliBKpxV1TvM7ppFg42nxCD3XK_g",
//   authDomain: "horizon-editor-65297.firebaseapp.com",
//   projectId: "horizon-editor-65297",
//   storageBucket: "horizon-editor-65297.firebasestorage.app",
//   messagingSenderId: "426232485862",
//   appId: "1:426232485862:web:543f3e65d7a0a4a1276827",
//   measurementId: "G-EMEJEJJ74P"
// };

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);