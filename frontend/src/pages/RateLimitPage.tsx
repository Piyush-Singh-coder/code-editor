import { ZapIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RateLimitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-base-200/50 border border-base-content/10 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-sm relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-primary/20">
              <ZapIcon className="size-10 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rate Limit Exceeded
            </h1>

            <p className="text-lg text-base-content/80 mb-2 font-medium">
              You've made too many requests in a short period.
            </p>

            <p className="text-base-content/60 mb-8 max-w-md">
              Please wait a moment before trying again. We limit requests to
              ensure a fair experience for everyone.
            </p>

            <button
              onClick={() => navigate("/")}
              className="btn btn-primary btn-wide group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitPage;
