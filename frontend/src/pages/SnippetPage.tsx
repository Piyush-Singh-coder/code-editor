import { useEffect, useState } from "react";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { useSnippetStore } from "../store/snippetStore";
import SnippetCard from "../components/SnippetCard";

function SnippetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState("grid");
  const { snippets, fetchSnippets, loading } = useSnippetStore();

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 text-base-content">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="ml-3">Loading snippets...</p>
      </div>
    );

  if (!snippets)
    return (
      <div className="min-h-screen">
        <Navbar />
      </div>
    );

  const languages = [
    ...new Set(snippets.map((s) => s.language).filter(Boolean)),
  ];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const title = snippet.title?.toLowerCase() || "";
    const language = snippet.language?.toLowerCase() || "";
    const userName = snippet.user?.fullName?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      title.includes(search) ||
      language.includes(search) ||
      userName.includes(search);

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-base-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Community Code Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Discover & Share Code Snippets
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto text-sm sm:text-lg">
            Explore and learn from curated snippets shared by developers.
          </p>
        </div>

        {/* Search & Filter Panel */}
        <div className="flex flex-col gap-6 mb-10">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="flex items-center bg-base-100 rounded-2xl shadow-md border border-base-300 transition-all focus-within:border-primary/50 focus-within:shadow-lg">
              <div className="absolute left-4 pointer-events-none">
                <Search className="w-5 h-5 text-base-content/60" />
              </div>
              <input
                type="text"
                placeholder="Search snippets by title, language, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-12 pr-12 py-4 focus:outline-none text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-error"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Language Filter + View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-base-100 rounded-2xl p-4 sm:p-5 shadow-md border border-base-300">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-base-content/70 font-medium">
                <Tag className="w-4 h-4" /> Filter by Language:
              </div>

              {popularLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() =>
                    setSelectedLanguage(lang === selectedLanguage ? null : lang)
                  }
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    selectedLanguage === lang
                      ? "bg-primary text-primary-content border-primary shadow-md scale-105"
                      : "bg-base-200 border-base-300 text-base-content/70 hover:bg-base-300 hover:text-base-content"
                  }`}
                >
                  <img
                    src={`/${lang}.png`}
                    alt={lang}
                    className="w-4 h-4 object-contain"
                  />
                  {lang}
                </button>
              ))}

              {selectedLanguage && (
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-error/10 text-error border border-error/20 hover:bg-error/20"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* View Toggle Buttons */}
            <div className="flex items-center gap-1 bg-base-200 rounded-xl p-1 border border-base-300">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-md transition-all ${
                  view === "grid"
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/60 hover:bg-base-300"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md transition-all ${
                  view === "list"
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/60 hover:bg-base-300"
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        <div
          className={`grid gap-5 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <div className="text-center mt-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-base-100 border border-base-300 mb-6 shadow-lg">
              <Code className="w-10 h-10 text-base-content/50" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-3">
              No snippets found
            </h3>
            <p className="text-base-content/60 mb-6 max-w-md mx-auto">
              {searchQuery || selectedLanguage
                ? "Try adjusting your search or filters to discover more snippets."
                : "Be the first to share a snippet with the community!"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage(null);
              }}
              className="btn btn-primary btn-wide"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnippetPage;
