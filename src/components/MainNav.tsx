import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";


const pages = ['JTC', 'Masghool', '962', 'CMC', 'Z-Hub'];

interface MainNavProps {
  lang?: 'en' | 'ar';
  onLangToggle?: () => void;
}

export default function MainNav({onLangToggle }: MainNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0cafa3] border-b border-white/20 relative z-50">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl flex-shrink-0">
          <span className="text-xl font-bold">Kafa'at</span>
          <span className="text-sm opacity-40 ml-1">كفاءات</span>
        </div>

        {/* Desktop: page links + globe */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2">
          {pages.map((page) => (
            <span
              key={page}
              className="text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm cursor-default hover:bg-white/20 transition-colors"
            >
              {page}
            </span>
          ))}
          {/* Globe — desktop */}
          {onLangToggle && (
            <button
              onClick={onLangToggle}
              className="ml-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile: globe + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          {onLangToggle && (
            <button
              onClick={onLangToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/20 px-4 py-3 flex flex-col gap-1">
          {pages.map((page) => (
            <span
              key={page}
              className="text-white px-3 py-2.5 rounded-lg text-sm cursor-default hover:bg-white/20 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {page}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}