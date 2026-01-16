import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Code2, Loader2, Zap } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const { login, isLoggingIn, googleLogin } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      // Error handled in store
      console.log("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch {
      console.log("Google Login failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100 relative">
        <div className="w-full max-w-md space-y-8">
          {/* Form Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 ring-1 ring-primary/20">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-base-content/60">
              Enter your credentials to access your workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control space-y-1.5">
              <label className="label pl-1">
                <span className="label-text font-medium text-base-content/80">
                  Email Address
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all duration-200 bg-base-100"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control space-y-1.5">
              <label className="label pl-1">
                <span className="label-text font-medium text-base-content/80">
                  Password
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors z-10" />
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all duration-200 bg-base-100"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline mt-1"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* {error && (
              <div className="alert alert-error text-sm py-2 rounded-lg border border-error/20 bg-error/10 text-error-content">
                <span className="font-medium">Error!</span> {error}
              </div>
            )} */}
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-content/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-base-100 text-base-content/50">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="btn btn-outline w-full flex items-center gap-2 hover:bg-base-200 transition-colors border-base-content/20 text-base-content/80 font-normal"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <div className="text-center">
            <p className="text-sm text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="link link-primary font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Modern Code Execution Theme */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-base-100 border-r border-base-300 relative overflow-hidden p-12">
        {/* Background Tech Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        {/* Glowing Orbs for ambience */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />

        <div className="max-w-xl w-full relative z-10 space-y-10">
          {/* Header Branding */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-base-100/50 border border-base-content/10 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-warning fill-warning" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Ultra-fast execution
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Compile. Run. <br />
              <span className="text-primary">Deploy.</span>
            </h1>
            <p className="text-lg text-base-content/70 max-w-md">
              Join thousands of developers building the future. Multi-language
              support, real-time collaboration, and instant deployment.
            </p>
          </div>

          {/* IDE Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden bg-base-100 border border-base-content/10 shadow-2xl">
              {/* IDE Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-base-300/50 border-b border-base-content/10 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-base-200/50 border border-base-content/5">
                  <Code2 className="w-3 h-3 text-base-content/50" />
                  <span className="text-xs font-mono text-base-content/70">
                    solution.ts
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-xs font-semibold text-primary">
                    TypeScript
                  </span>
                  <span className="text-xs text-base-content/30">Python</span>
                  <span className="text-xs text-base-content/30">Go</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 bg-[#0F1117]/95 font-mono text-sm leading-relaxed overflow-hidden">
                <div className="flex gap-4">
                  <div className="flex flex-col text-right text-base-content/30 select-none">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                  </div>
                  <div className="flex-1">
                    <p>
                      <span className="text-purple-400">interface</span>{" "}
                      <span className="text-yellow-300">User</span> {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-red-300">id</span>:{" "}
                      <span className="text-blue-400">number</span>;
                    </p>
                    <p className="pl-4">
                      <span className="text-red-300">name</span>:{" "}
                      <span className="text-blue-400">string</span>;
                    </p>
                    <p>{"}"}</p>
                    <br />
                    <p>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">login</span> ={" "}
                      <span className="text-purple-400">async</span> (){" "}
                      <span className="text-purple-400">=&gt;</span> {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-base-content/50">
                        // Initializing secure environment...
                      </span>
                    </p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="bg-black/90 px-4 py-2 border-t border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-mono text-success">
                  Server listening on port 3000...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
