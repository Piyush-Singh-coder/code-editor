import { useCodeEditorStore } from "../store/codeEditorStore";
import { LANGUAGE_CONFIG } from "../lib/language";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LanguageSelector = () => {
  const { language, setLanguage } = useCodeEditorStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Current Language Data
  const currentLanguage =
    LANGUAGE_CONFIG[language as keyof typeof LANGUAGE_CONFIG];

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

  if (!currentLanguage) return null;

  return (
    <div className="relative group z-40" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-base-content/20 hover:border-primary/50 bg-base-200/50 hover:bg-base-200 transition-all w-40 justify-between"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={currentLanguage.logoPath}
            alt={currentLanguage.label}
            className="w-4 h-4 object-contain"
          />
          <span className="text-sm font-medium truncate">
            {currentLanguage.label}
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
        <div className="absolute top-full left-0 mt-2 w-48 bg-base-200 rounded-xl shadow-xl border border-base-content/10 p-1 animate-in fade-in zoom-in-95 duration-100 max-h-75 overflow-y-auto">
          <div className="px-2 py-1 text-[10px] uppercase font-bold text-base-content/40 tracking-wider">
            Select Language
          </div>
          {Object.values(LANGUAGE_CONFIG).map((lang) => (
            <button
              key={lang.id}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                language === lang.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-300 text-base-content/70"
              }`}
              onClick={() => {
                setLanguage(lang.id);
                setIsOpen(false);
              }}
            >
              <img
                src={lang.logoPath}
                alt={lang.label}
                className="w-5 h-5 object-contain"
              />
              <span className="flex-1 text-left">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
