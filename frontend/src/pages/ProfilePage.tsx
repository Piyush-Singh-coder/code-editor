import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useExecutionStore } from "../store/executionStore";
import { useCodeEditorStore } from "../store/codeEditorStore";
import {
  Calendar,
  Code2,
  Mail,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Camera,
  FileCode,
} from "lucide-react";

// Assuming theme is managed via data-theme on html or similar,
// but for this specific design component logic, we can try to detect or just use DaisyUI capabilities
// which map to the user's requested "dark/light" logic effectively if we use base-content/base-100.
// However, the user provided specific Tailwind colors (gray-900 etc).
// We should try to stick to DaisyUI variables to respect the "Theme Selector" feature we built.
// The user's request said "use this to update ProfilePage", implying they like this specific visual.
// I will adapt the structure to use DaisyUI colors that MATCH the visual intent of the provided code,
// instead of hardcoded grays, to ensure themes still work.

const ProfilePage = () => {
  const { user } = useAuthStore();
  const {
    executions,
    fetchExecutions,
    deleteExecution,
    isLoading,
    fetchExecution,
  } = useExecutionStore();
  const { setCode, setLanguage, setOutput } = useCodeEditorStore();
  const navigate = useNavigate();

  const handleExecutionClick = async (executionId: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await fetchExecution(executionId);
      const execution = response.execution;
      if (execution) {
        setCode(execution.code);
        setLanguage(execution.language);
        setOutput(execution.output);
        navigate("/");
      }
    } catch (error) {
      console.error("Error opening execution:", error);
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, [fetchExecutions]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-300">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Logic to determine display name and initials
  const displayName = user.fullName || "User Name";

  // Get Initials logic
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };
  const initials = getInitials(displayName);

  return (
    <div className="absolute inset-0 z-40 bg-base-300 overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation / Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:bg-base-200 text-base-content"
          >
            <ArrowLeft size={20} />
            Back to Editor
          </button>
        </div>

        {/* Profile Card */}
        <div className="card bg-base-100 border border-base-300 shadow-xl rounded-2xl overflow-hidden mb-10">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar Section with Initials */}
              <div className="relative group">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-32 h-32 flex items-center justify-center shadow-2xl ring-4 ring-primary/30">
                    <span className="text-4xl font-bold tracking-wider">
                      {initials}
                    </span>
                  </div>
                </div>
                {/* Simulated Upload Button */}
                <button
                  className="absolute bottom-1 right-1 bg-base-content text-base-100 p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-not-allowed opacity-80"
                  title="Upload not available in demo"
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left flex-1 space-y-3">
                <h1 className="text-3xl font-bold text-base-content">
                  {displayName}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-base-content/70">
                  <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Member since{" "}
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full text-sm">
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                    <span>Active Account</span>
                  </div>
                </div>
              </div>

              {/* Stats/Action */}
              <div className="px-6 py-4 rounded-xl bg-base-200/50 border border-base-300 text-center min-w-[150px]">
                <div className="text-3xl font-bold text-base-content">
                  {executions.length}
                </div>
                <div className="text-sm text-base-content/50 font-medium uppercase tracking-wide">
                  Saved Snippets
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Executions Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-base-content">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Code2 className="w-6 h-6" />
            </div>
            Saved Executions
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : executions.length === 0 ? (
            <div className="card bg-base-100 shadow-xl rounded-xl p-12 text-center border border-base-300">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto text-base-content/50">
                  <FileCode size={32} />
                </div>
                <h3 className="text-lg font-medium text-base-content">
                  No saved snippets yet
                </h3>
                <p className="text-base-content/60">
                  Start coding in the editor and save your work to see it appear
                  here!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executions.map((execution) => (
                <div
                  key={execution._id}
                  className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden group flex flex-col"
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className="badge px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase border border-primary/20">
                          {execution.language}
                        </div>
                        <span className="text-xs text-base-content/50">
                          {new Date(execution.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => deleteExecution(execution._id)}
                          className="p-1.5 text-error hover:bg-error/10 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <h3
                      className="font-semibold text-lg mb-3 text-base-content truncate"
                      title={execution.language}
                    >
                      {/* Name doesn't exist on execution currently, using Language or a placeholder title?
                          Going with Language + Date for now or just generic title */}
                      {execution.language} Snippet
                    </h3>

                    {/* Code Preview */}
                    <div className="relative flex-1 bg-base-300/50 rounded-lg overflow-hidden border border-base-300 min-h-[120px]">
                      <div className="absolute top-2 right-2 bg-base-300/80 px-2 py-0.5 rounded text-[10px] text-base-content/50 z-10 border border-base-content/10">
                        Preview
                      </div>
                      <pre className="p-3 font-mono text-xs text-base-content/70 overflow-hidden opacity-80 leading-relaxed">
                        {execution.code.slice(0, 150)}...
                      </pre>
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-base-300/50 to-transparent"></div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 border-t border-base-300 bg-base-200/30">
                    <button
                      onClick={() => handleExecutionClick(execution._id)}
                      className="w-full btn flex items-center justify-center gap-2 btn-primary py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-primary/20"
                    >
                      <ExternalLink size={16} />
                      Open in Editor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
