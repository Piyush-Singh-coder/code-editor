import { useState } from "react";
import EditorPanel from "../components/EditorPanel";
import OutputPanel from "../components/OutputPanel";
import HistorySidebar from "../components/HistorySidebar";
import { useCodeEditorStore } from "../store/codeEditorStore";
import {
  PlayIcon,
  RotateCcwIcon,
  SaveIcon,
  ShareIcon,
  TypeIcon,
} from "lucide-react";
import LanguageSelector from "../components/LanguageSelector";
import ThemeSelector from "../components/ThemeSelector";
import ShareSnippetDialog from "../components/ShareSnippetDialog";
import SaveExecutionDialog from "../components/SaveExecutionDialog";
import { useAuthStore } from "../store/authStore";
import RunningCodeSkeleton from "../components/RunningCodeSkeleton";

const HomePage = () => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const { user } = useAuthStore();

  const { language, editor, runCode, isRunning, fontSize, setFontSize } =
    useCodeEditorStore();

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleRefresh = () => {
    if (editor) {
      editor.setValue(""); // Or reset default
      localStorage.removeItem(`editor-code-${language}`);
      window.location.reload(); // Simple refresh for now or just reset value
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col pt-16">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile, likely toggleable in future but fixed for now */}
        <div className="hidden md:block h-full">
          <HistorySidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-base-200/30">
          {/* Toolbar */}
          <div className="h-14 border-b border-base-300 bg-base-100/50 backdrop-blur flex items-center justify-between px-4 z-10 shrink-0">
            {/* Left: Selectors */}
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeSelector />

              {/* Font Size Slider */}
              <div className="items-center gap-2 bg-base-200/50 px-3 py-1.5 rounded-lg ring-1 ring-base-content/10 hidden sm:flex">
                <TypeIcon className="size-3.5 text-base-content/70" />
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="range range-xs range-primary w-20"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="btn btn-ghost btn-sm btn-square"
                title="Reset Code"
              >
                <RotateCcwIcon className="w-4 h-4" />
              </button>

              {user && (
                <>
                  <button
                    onClick={() => setIsSaveDialogOpen(true)}
                    className="btn btn-ghost btn-sm"
                  >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsShareDialogOpen(true)}
                    className="btn btn-ghost btn-sm text-primary"
                  >
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </>
              )}

              <button
                onClick={runCode}
                disabled={isRunning}
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                {isRunning ? (
                  <RunningCodeSkeleton />
                ) : (
                  <PlayIcon className="w-4 h-4" />
                )}
                Run
              </button>
            </div>
          </div>

          {/* Editor & Output Split */}
          <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
            {/* Editor Section */}
            <div className="flex-1 md:flex-[0.5] lg:flex-[0.45] h-[60vh] md:h-full overflow-hidden">
              <EditorPanel />
            </div>

            {/* Output Section */}
            <div className="flex-1 md:flex-[0.5] lg:flex-[0.55] h-[40vh] md:h-full overflow-hidden">
              <OutputPanel />
            </div>
          </div>
        </main>
      </div>

      {/* Dialogs */}
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
      {isSaveDialogOpen && (
        <SaveExecutionDialog onClose={() => setIsSaveDialogOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
