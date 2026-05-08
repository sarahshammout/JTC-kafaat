import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

const pages = ['JTC', 'Masghool', '962', 'CMC', 'Z-Hub', 'Kafaat'];

interface MainNavProps {
  lang?: 'en' | 'ar';
  onLangToggle?: () => void;
}

export default function MainNav({ lang = 'en', onLangToggle }: MainNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  return (
    <>
      <nav className="bg-[#0cafa3] border-b border-white/20 relative z-50">
        <div className="flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4">
          {/* Logo */}
          <div className="text-white font-bold text-xl flex-shrink-0">
            <span className="text-xl font-bold">Kafa'at</span>
            <span className="text-sm opacity-40 ml-1"> كفاءات</span>
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

          {/* Mobile: hamburger only */}
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
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 z-[100] flex" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel — right for EN, left for AR */}
          <div
            className={`relative z-10 w-72 max-w-[85vw] h-full flex flex-col px-4 py-6 ${isRtl ? 'mr-auto' : 'ml-auto'}`}
            style={{ background: '#0e8f86' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="text-white font-bold text-lg">
                Kafa'at <span className="text-sm opacity-40 ml-1">كفاءات</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {pages.map((page) => (
                <span
                  key={page}
                  className="text-white px-3 py-3 rounded-lg text-sm font-medium cursor-default hover:bg-white/20 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {page}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}