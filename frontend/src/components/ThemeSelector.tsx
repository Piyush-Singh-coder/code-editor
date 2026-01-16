import { useCodeEditorStore } from "../store/codeEditorStore";
import { THEMES } from "../lib/language";
import { ChevronDown, Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ThemeSelector = () => {
  const { theme, setTheme } = useCodeEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!currentTheme) return null;

  return (
    <div className="relative group z-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-base-content/20 hover:border-primary/50 bg-base-200/50 hover:bg-base-200 transition-all w-36 justify-between"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Palette className="w-4 h-4 text-base-content/70" />
          <span className="text-sm font-medium truncate">
            {currentTheme.label}
          </span>
        </div>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-base-200 rounded-xl shadow-xl border border-base-content/10 p-1 animate-in fade-in zoom-in-95 duration-100 max-h-75 overflow-y-auto">
          <div className="px-2 py-1 text-[10px] uppercase font-bold text-base-content/40 tracking-wider">
            Select Theme
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                theme === t.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-300 text-base-content/70"
              }`}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
            >
              <div
                className="w-3 h-3 rounded-full border border-base-content/20"
                style={{ backgroundColor: t.color }}
              />
              <span className="flex-1 text-left">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
