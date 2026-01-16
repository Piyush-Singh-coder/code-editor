import { Mail, LogOut, RefreshCw } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const { user, logout, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleCheckVerification = async () => {
    await checkAuth();
    if (user?.isVerified) {
      toast.success("Email verified successfully!");
      navigate("/");
    } else {
      console.log("Email not verified yet");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="max-w-md w-full bg-base-100 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
          <p className="text-base-content/60 mb-8">
            We've sent a verification link to{" "}
            <span className="font-medium text-base-content">
              {user?.email || "your email"}
            </span>
            . Please click the link to verify your account.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleCheckVerification}
              className="btn btn-primary w-full flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              I've Verified My Email
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-ghost w-full flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        <div className="bg-base-300/50 p-4 text-center text-sm text-base-content/60">
          Did not receive the email? Check your spam folder.
        </div>
      </div>
    </div>
  );
};
export default VerifyEmailPage;
