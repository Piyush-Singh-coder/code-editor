import { X } from "lucide-react";
import { useState } from "react";
import { useCodeEditorStore } from "../store/codeEditorStore";
import { useExecutionStore } from "../store/executionStore";

const SaveExecutionDialog = ({ onClose }: { onClose: () => void }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { language, editor, output } = useCodeEditorStore();
  const { saveExecution } = useExecutionStore();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const code = editor?.getValue() || "";
      await saveExecution({
        language,
        code,
        output: output || "",
      });
      onClose();
    } catch (error) {
      console.error("Error saving execution:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md border border-base-200">
        <div className="flex items-center justify-between p-4 border-b border-base-200">
          <h2 className="text-lg font-bold">Save Execution</h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost btn-circle"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-base-content/70">
              Are you sure you want to save this execution to your profile?
            </p>
            <div className="bg-base-200 p-3 rounded-lg text-xs space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Language:</span>
                <span className="uppercase">{language}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Code Length:</span>
                <span>{editor?.getValue().length || 0} chars</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Output Length:</span>
                <span>{output?.length || 0} chars</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Save Execution"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveExecutionDialog;
