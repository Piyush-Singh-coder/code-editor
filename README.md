# 🌌 Horizon Code Editor

Horizon Code Editor is a high-performance, collaborative code execution and snippet sharing platform designed for modern developers. Built with the **MERN stack**, it provides a seamless environment to write, run, and share code across **10+ programming languages**.

![Horizon Preview](https://via.placeholder.com/1200x600?text=Horizon+Code+Editor+Preview)

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
| **🚀 Real-time Execution** | Low-latency code execution powered by the **Judge0 CE API**. |
| **🌍 10+ Languages** | Native support for JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, Ruby, and Swift. |
| **🎨 Personalization** | **12+ UI themes** (DaisyUI) and multiple custom **Monaco Editor** themes (VS Dark, GitHub Dark, etc.). |
| **🔐 Secure Auth** | Multi-factor authentication including **Google OAuth (Firebase)** and JWT-based Email/Password login. |
| **📧 Email Verification** | Automated email verification flow using **Nodemailer** to ensure secure user onboarding. |
| **📂 Snippet Sharing** | Save, share, and star code snippets within the community. Built-in commenting system for collaboration. |
| **🛡️ Rate Limiting** | Intelligent protection against execution abuse using **Rate-Limiter-Memory**. |

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & DaisyUI
- **State:** Zustand
- **Editor:** Monaco Editor (`@monaco-editor/react`)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT & Firebase Admin SDK
- **Proxy:** Axios

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or Atlas URI)
- **Judge0 API Key** (Sourced from RapidAPI)

### 2. Clone the Repository
```bash
git clone https://github.com/Piyush-Singh-coder/code-editor.git
cd code-editor
```

### 3. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and populate:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Authentication (Firebase Admin)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="..."

# Code Execution (Judge0 via RapidAPI)
JUDGE0_API_KEY=your_rapidapi_key
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
```

4. Run the server: `npm run dev`

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Run the application: `npm run dev`

---

## 🚀 Deployment

- **Backend:** Optimized for **Vercel** (Root directory: `backend`).
- **Frontend:** Optimized for **Cloudflare Pages** (Build command: `npm run build`, Output: `dist`).

> [!TIP]
> After deployment, ensure both `CLIENT_URL` (Backend) and `VITE_API_URL` (Frontend) are updated to point to your production domains.

---

## 📜 License
This project is licensed under the [ISC License](LICENSE).

---
*Created with ❤️ by Piyush Singh*
