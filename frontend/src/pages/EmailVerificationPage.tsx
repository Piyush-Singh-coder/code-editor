import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader, CheckCircle, XCircle, Mail } from "lucide-react";

const EmailVerificationPage = () => {
  const { token } = useParams<{ token: string }>();
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");

  const handleVerify = async () => {
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("verifying");
    try {
      await verifyEmail(token);
      setStatus("success");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md w-full bg-base-100 rounded-xl shadow-xl p-8 text-center">
        {status === "idle" && (
          <div className="flex flex-col items-center gap-4">
            <Mail className="w-16 h-16 text-primary" />
            <h2 className="text-2xl font-bold">Verify Your Email</h2>
            <p className="text-base-content/60">
              Click the button below to complete your email verification.
            </p>
            <button
              onClick={handleVerify}
              className="btn btn-primary w-full mt-4"
            >
              Verify Email
            </button>
          </div>
        )}

        {status === "verifying" && (
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-16 h-16 text-primary animate-spin" />
            <h2 className="text-2xl font-bold">Verifying...</h2>
            <p className="text-base-content/60">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-16 h-16 text-success" />
            <h2 className="text-2xl font-bold">Email Verified!</h2>
            <p className="text-base-content/60">
              Redirecting you to the home page...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-16 h-16 text-error" />
            <h2 className="text-2xl font-bold">Verification Failed</h2>
            <p className="text-base-content/60">
              The verification link is invalid or expired.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary mt-4"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
