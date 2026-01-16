import { useState } from "react";
import { useCodeEditorStore } from "../store/codeEditorStore";
import { useSnippetStore } from "../store/snippetStore";
import { X } from "lucide-react";

const ShareSnippetDialog = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const { createSnippet, isCreating } = useSnippetStore();
  const { code, language } = useCodeEditorStore();

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSnippet({ title, code, language });
      onClose();
    } catch (error) {
      console.error("Error sharing snippet:", error);
    }
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box rounded-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Info note */}
        <div className="bg-base-200 text-sm border border-base-content/10 rounded-lg mt-6 mb-3 py-2 px-3">
          This snippet will be visible to everyone in the Community Library.
        </div>

        <h3 className="font-semibold text-lg mb-1">Share Snippet</h3>
        <p className="text-sm text-base-content/50 mb-4">
          Give your snippet a clear and descriptive title.
        </p>

        <form onSubmit={handleShare} className="flex flex-col gap-4">
          <div className="form-control w-full">
            <label className="label pb-1">
              <span className="label-text text-base-content/50 font-medium">Snippet Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. Binary Search in Java"
              required
            />
          </div>

          <div className="modal-action mt-6 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isCreating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary min-w-27.5"
              disabled={isCreating || !title.trim()}
            >
              {isCreating ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Share"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </div>
  );
};

export default ShareSnippetDialog;
