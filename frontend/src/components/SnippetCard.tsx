import { useState } from "react";
import { Clock, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useSnippetStore } from "../store/snippetStore";
import StarButton from "./StarButton";

function SnippetCard({ snippet }: { snippet: any }) {
  const { user } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteSnippet } = useSnippetStore();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsDeleting(true);
    try {
      await deleteSnippet(snippet._id);
    } catch (error) {
      console.error("Error deleting snippet:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary transition-all duration-300 hover:shadow-lg group overflow-hidden">
      <Link
        to={`/snippets/${snippet._id}`}
        className="h-full flex flex-col justify-between"
      >
        <div className="card-body p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between relative">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-base-300 ring-1 ring-base-content/10">
                <img
                  src={`/${snippet.language}.png`}
                  alt={`${snippet.language} logo`}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <div className="badge badge-outline badge-primary badge-sm mb-1 uppercase text-[10px] tracking-wider font-bold">
                  {snippet.language}
                </div>
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <Clock className="w-3 h-3" />
                  {new Date(snippet.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div
              className="flex items-center gap-3 absolute top-0 right-0 z-10"
              onClick={(e) => e.preventDefault()}
            >
              <StarButton snippet={snippet} />

              {user && snippet.user && user._id === snippet.user._id && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`btn btn-xs btn-ghost btn-square group/delete transition-colors ${
                    isDeleting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-error/10 hover:text-error"
                  }`}
                  aria-label="Delete snippet"
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Title & Author */}
          <div>
            <h2 className="text-lg md:text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {snippet.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <User className="w-4 h-4" />
              <span className="truncate max-w-[150px]">
                {snippet.user?.fullName || "Anonymous"}
              </span>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative rounded-lg bg-base-300/50 overflow-hidden ring-1 ring-base-content/5 group-hover:ring-primary/20 transition-all h-24">
            <pre className="p-3 text-xs font-mono text-base-content/80 whitespace-pre-wrap break-all opacity-80">
              {snippet.code}
            </pre>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-200 opacity-90" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SnippetCard;
