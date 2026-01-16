import { useEffect } from "react";
import { useExecutionStore } from "../store/executionStore";
import { useCodeEditorStore } from "../store/codeEditorStore";
import { Trash2, Clock, SaveIcon } from "lucide-react";

const HistorySidebar = () => {
  const { executions, fetchExecutions, deleteExecution, isLoading } =
    useExecutionStore();
  const { setCode, setLanguage, setOutput } = useCodeEditorStore();

  useEffect(() => {
    fetchExecutions();
  }, [fetchExecutions]);

  return (
    <div className="w-64 h-full bg-base-100/50 backdrop-blur border-r border-base-300 flex flex-col">
      <div className="p-4 border-b border-base-300 bg-base-100/50">
        <h2 className="font-bold flex items-center gap-2">
          <SaveIcon className="w-4 h-4" />
          Saved Executions
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {isLoading && executions.length === 0 ? (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : executions.length === 0 ? (
          <div className="text-center py-8 text-base-content/50 text-sm">
            No saved executions yet.
          </div>
        ) : (
          executions.map((execution) => (
            <div
              key={execution._id}
              className="group p-3 rounded-lg cursor-pointer bg-base-100 border border-base-300 hover:border-primary/50 transition-all shadow-sm"
              onClick={() => {
                setCode(execution.code);
                setLanguage(execution.language);
                setOutput(execution.output);
              }}
            >
              <div className="flex justify-between items-start mb-1">
                {/* execution doesn't have a 'name' field in the schema I saw earlier, usually just code/lang/output/createdAt.
                     I'll just show Language + Date */}
                <span className="font-medium text-xs uppercase">
                  {execution.language}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteExecution(execution._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-base-content/50 hover:text-error transition-opacity"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-base-content/50 truncate font-mono">
                {execution.code.substring(0, 30)}...
              </div>
              <div className="mt-2 text-[10px] text-base-content/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(execution.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
