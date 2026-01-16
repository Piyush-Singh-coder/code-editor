import { Menu, X, Code2, Palette, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { themes } from "../lib/themes";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = () => setThemeDropdownOpen(false);
    if (themeDropdownOpen) {
      window.addEventListener("click", closeDropdowns);
    }
    return () => window.removeEventListener("click", closeDropdowns);
  }, [themeDropdownOpen]);

  return (
    <header className="fixed top-0 w-full z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-sm relative transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 h-16">
        {/* ---- LOGO ---- */}
        <Link
          to="/"
          className="flex items-center gap-2 group relative no-underline"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all blur-xl"></div>
          <div className="relative bg-base-300/50 p-2 rounded-xl ring-1 ring-base-content/10 group-hover:ring-primary/50 transition-all shadow-lg">
            <div className="w-7 h-7 flex items-center justify-center text-primary">
              <img src="logo1.png" alt="logo" className="w-15 h-9"/>
            </div>
          </div>
          <div className="relative">
            <span className="block text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
              Horizon
            </span>
            <span className="block text-[10px] uppercase tracking-wider text-base-content/60 font-semibold">
              Code Editor
            </span>
          </div>
        </Link>
        {/* ---- DESKTOP LINKS ---- */}
        <div className="hidden md:flex items-center gap-4">
          {/* IMPROVED THEME SELECTOR */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="btn btn-ghost btn-sm flex items-center gap-2 normal-case font-medium border border-base-300 bg-base-100 hover:bg-base-200"
            >
              <Palette className="w-4 h-4 text-base-content/70" />
              <span className="capitalize">{theme}</span>
              <ChevronDown
                className={`w-3 h-3 text-base-content/50 transition-transform ${
                  themeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Custom Dropdown Grid */}
            {themeDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-base-200 rounded-xl shadow-2xl border border-base-300 p-2 grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200 z-50 overflow-y-auto max-h-[300px]">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-all ${
                      theme === t
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "hover:bg-base-300 text-base-content/80"
                    }`}
                  >
                    {/* Theme Preview Dot */}
                    <div
                      className="w-3 h-3 rounded-full border border-base-content/20"
                      style={{
                        backgroundColor:
                          t === "dark"
                            ? "#000"
                            : t === "light"
                            ? "#fff"
                            : "currentColor",
                      }}
                      data-theme={t}
                    ></div>
                    <span className="capitalize flex-1 text-left">{t}</span>
                    {theme === t && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link to="/snippets">
            <button className="btn btn-ghost btn-sm text-base-content/80 hover:text-primary transition-colors">
              Snippets
            </button>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <button className="btn btn-ghost btn-sm text-base-content/80 hover:text-primary transition-colors">
                  Profile
                </button>
              </Link>
              <button className="btn btn-error btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary btn-sm shadow-lg shadow-primary/20">
                Login
              </button>
            </Link>
          )}
        </div>
        {/* ---- MOBILE MENU BUTTON ---- */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {/* ---- MOBILE DROPDOWN ---- */}
      {menuOpen && (
        <div className="md:hidden bg-base-100/95 backdrop-blur-xl border-t border-base-300 shadow-xl absolute w-full left-0 animate-in slide-in-from-top-2 duration-200 z-40">
          <div className="p-4 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2 p-2 bg-base-200 rounded-xl border border-base-300">
              {themes.slice(0, 6).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`text-xs p-2 rounded-lg capitalize transition-all ${
                    theme === t
                      ? "bg-primary text-primary-content shadow-sm font-bold"
                      : "text-base-content/70 hover:bg-base-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <nav className="flex flex-col gap-2">
              <Link
                to="/snippets"
                className="btn btn-ghost justify-start w-full"
                onClick={() => setMenuOpen(false)}
              >
                Snippets
              </Link>
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="btn btn-ghost justify-start w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="btn btn-error btn-outline justify-start w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-primary w-full shadow-lg shadow-primary/20">
                    Login
                  </button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
