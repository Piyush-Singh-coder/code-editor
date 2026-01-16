# Horizon Code Editor

Horizon Code Editor is a modern, collaborative code execution and snippet sharing platform. It allows users to write, run, and share code snippets in multiple languages with a beautiful, dark-themed interface.

## 🚀 Features

-   **Multi-language Support**: Run code in JavaScript, TypeScript, Python, Java, C++, and more using the Piston API.
-   **Real-time Execution**: Instant code execution and output display.
-   **Snippet Sharing**: Save your code snippets and share them with the community.
-   **Comment System**: Discuss and provide feedback on shared snippets.
-   **Authentication**: Secure login/signup with Email/Password and Google Authentication (Firebase).
-   **User Profiles**: Track your usage and manage your snippets.
-   **Dark Mode**: A sleek, developer-friendly UI powered by DaisyUI.

## 🛠️ Tech Stack

**Frontend:**
-   React (Vite)
-   TypeScript
-   Tailwind CSS & DaisyUI
-   Zustand (State Management)
-   Monaco Editor (Code Editor)

**Backend:**
-   Node.js & Express
-   MongoDB (Database)
-   Mongoose (ODM)
-   JWT (Authentication)
-   Firebase Admin (Google Auth)

## ⚙️ Local Development Setup

### Prerequisites
-   Node.js (v18+)
-   MongoDB installed locally or a MongoDB Atlas URI.

### 1. Clone the Repository
```bash
git clone https://github.com/Piyush-Singh-coder/code-editor.git
cd code-editor
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email_for_verification
EMAIL_PASS=your_email_app_password
# Firebase Admin SDK (for Google Auth)
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional for local dev, defaults to localhost):
```env
# Only needed if backend is not on localhost:3000/api
# VITE_API_URL=http://localhost:3000/api
```

Run the frontend:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 🚀 Deployment

### Backend (Vercel)
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Set **Root Directory** to `backend`.
4.  Add all environment variables from `.env` to Vercel Project Settings.
5.  Deploy.

### Frontend (Cloudflare Pages)
1.  Import project into Cloudflare Pages.
2.  Set **Root Directory** to `frontend`.
3.  Set **Build Command** to `npm run build`.
4.  Set **Output Directory** to `dist`.
5.  Add Environment Variable:
    -   `VITE_API_URL`: Your Vercel Backend URL (e.g., `https://your-backend.vercel.app/api`).
6.  Deploy.

*Note: After deploying frontend, update `CLIENT_URL` and `FRONTEND_URL` in Vercel to point to your new Cloudflare domain.*
