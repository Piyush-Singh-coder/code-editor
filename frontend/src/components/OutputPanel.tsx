import { AlertTriangle, CheckCircle, Clock, Terminal } from "lucide-react";
import { useCodeEditorStore } from "../store/codeEditorStore";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();
  const hasOutput = output || error;

  return (
    <div className="relative bg-base-200/50 rounded-xl border border-base-300 p-4 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-base-content/70" />
          <h2 className="text-sm font-semibold text-base-content/70">
            Console
          </h2>
        </div>
      </div>

      {/* Output Area */}
      <div className="relative flex-1 bg-base-100 rounded-lg border border-base-300 overflow-hidden font-mono text-xs md:text-sm">
        {isRunning ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <RunningCodeSkeleton />
            <span className="text-base-content/50 text-xs">
              Executing code...
            </span>
          </div>
        ) : !hasOutput ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-base-content/40">
            <Clock className="w-6 h-6" />
            <p>Ready to execute</p>
          </div>
        ) : (
          <div className="p-4 h-full overflow-y-auto">
            {error ? (
              <div className="flex items-start gap-3 text-error">
                <AlertTriangle className="w-4 h-4 mt-1 shrink-0" />
                <pre className="whitespace-pre-wrap break-words">{error}</pre>
              </div>
            ) : (
              <div className="flex items-start gap-3 text-base-content">
                <CheckCircle className="w-4 h-4 mt-1 shrink-0 text-success" />
                <pre className="whitespace-pre-wrap break-words">{output}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
