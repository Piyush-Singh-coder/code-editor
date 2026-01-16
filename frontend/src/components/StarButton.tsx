import { Star } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useSnippetStore } from "../store/snippetStore";
import toast from "react-hot-toast";

function StarButton({ snippet }: { snippet: any }) {
  const { user } = useAuthStore();
  const { toggleStar } = useSnippetStore();
  const isStarred = user && snippet.stars.includes(user._id);
  const starCount = snippet.stars.length;

  const handleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to star snippets!");
      return;
    }

    try {
      await toggleStar(snippet._id);
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  return (
    <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
        transition-all duration-200 ${
          isStarred
            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
            : "bg-base-100/50 text-base-content/60 hover:bg-base-100 hover:text-base-content"
        }`}
      onClick={handleStar}
    >
      <Star
        className={`w-4 h-4 ${
          isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-current"
        }`}
      />
      <span className={`text-xs font-medium`}>{starCount}</span>
    </button>
  );
}

export default StarButton;
