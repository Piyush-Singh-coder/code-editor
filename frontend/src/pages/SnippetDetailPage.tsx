import { useEffect, useState } from "react";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { useSnippetStore } from "../store/snippetStore";
import { useAuthStore } from "../store/authStore";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../lib/language";

function SnippetDetailPage() {
  const { id } = useParams();
  const { snippets, fetchSnippets, addComment } = useSnippetStore();
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const snippet = snippets.find((s) => s._id === id);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !id) return;

    setIsSubmittingComment(true);
    try {
      await addComment(id, commentText);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  useEffect(() => {
    if (!snippet) {
      fetchSnippets();
    }
  }, [snippet, fetchSnippets]);

  if (!snippet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading snippet...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div
          key={snippet._id}
          className="card bg-base-100 shadow-xl border border-base-300"
        >
          {/* Header */}
          <div className="card-body p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="avatar">
                  <div className="w-14 rounded-xl bg-base-200 p-2">
                    <img
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-2xl font-bold text-base-content">
                    {snippet.title || "Untitled snippet"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-base-content/70 mt-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{snippet.user?.fullName || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(snippet.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="badge badge-outline px-4 py-2 text-sm font-medium">
                {snippet.language}
              </div>
            </div>

            {/* Code Editor */}
            <div className="mt-6 border border-base-300 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-base-300 bg-base-200">
                <div className="flex items-center gap-2 text-base-content/70">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-medium">Source Code</span>
                </div>
              </div>

              <Editor
                height="400px"
                language={
                  (LANGUAGE_CONFIG as any)[snippet.language]?.monacoLanguage ||
                  "plaintext"
                }
                value={snippet.code}
                theme="vs-dark"
                beforeMount={defineMonacoThemes}
                options={{
                  minimap: { enabled: true },
                  fontSize: 15,
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 12 },
                  renderWhitespace: "selection",
                  fontFamily:
                    '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontLigatures: true,
                }}
              />
            </div>

            {/* Comments Section */}
            <div className="mt-8 bg-base-200 p-6 rounded-xl border border-base-300">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments ({snippet.comments?.length || 0})
              </h3>

              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="input input-bordered w-full"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingComment || !commentText.trim()}
                      className="btn btn-primary"
                    >
                      {isSubmittingComment ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <MessageSquare className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-base-100 p-4 rounded-lg border border-base-300 mb-6 text-center text-sm text-base-content/70">
                  Please log in to leave a comment.
                </div>
              )}

              {snippet.comments?.length === 0 ? (
                <p className="text-base-content/60 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                <div className="space-y-4">
                  {snippet.comments?.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-4 bg-base-100 rounded-lg border border-base-300 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <User className="w-4 h-4 opacity-70" />
                          {comment.user.fullName}
                        </div>
                        <span className="text-xs text-base-content/50">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/80">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnippetDetailPage;
