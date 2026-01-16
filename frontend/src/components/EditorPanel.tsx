import { useEffect } from "react";
import { useCodeEditorStore } from "../store/codeEditorStore";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../lib/language";
import { Editor } from "@monaco-editor/react";

const EditorPanel = () => {
  const { language, theme, fontSize, editor, setEditor } = useCodeEditorStore();

  useEffect(() => {
    // We might still want to load the code here or in the parent.
    // Keeping it here makes sense for the "editor" responsibility.
    if (editor) {
      const savedCode = localStorage.getItem(`editor-code-${language}`);
      const defaultCode =
        LANGUAGE_CONFIG[language as keyof typeof LANGUAGE_CONFIG].defaultCode;
      editor.setValue(savedCode || defaultCode);
    }
  }, [language, editor]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-base-200/50 border border-base-300">
      <Editor
        height="100%"
        language={
          LANGUAGE_CONFIG[language as keyof typeof LANGUAGE_CONFIG]
            .monacoLanguage
        }
        defaultValue={
          LANGUAGE_CONFIG[language as keyof typeof LANGUAGE_CONFIG].defaultCode
        }
        onChange={handleEditorChange}
        theme={theme}
        beforeMount={defineMonacoThemes}
        onMount={(editor) => {
          setEditor(editor);
          const savedCode = localStorage.getItem(`editor-code-${language}`);
          if (savedCode) editor.setValue(savedCode);
        }}
        options={{
          minimap: { enabled: false },
          fontSize,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          renderWhitespace: "selection",
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
          fontLigatures: true,
          cursorBlinking: "smooth",
          smoothScrolling: true,
          renderLineHighlight: "all",
        }}
      />
    </div>
  );
};

export default EditorPanel;
