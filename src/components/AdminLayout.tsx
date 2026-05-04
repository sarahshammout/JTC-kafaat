import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Laptop, Gift, Inbox, ShoppingBag, ShoppingCart, Menu, X,
} from "lucide-react";

function useFonts() {
  useEffect(() => {
    const id = "jtc-admin-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

function NavItem({
  to, icon, label, active, onClick,
}: { to: string; icon: React.ReactNode; label: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? "bg-purple-600/20 text-purple-300" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      }`}
    >
      <span className={active ? "text-purple-400" : "text-slate-500"}>{icon}</span>
      {label}
    </Link>
  );
}

const NAV = [
  { to: "/jtc/admin",          icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
  { to: "/jtc/admin/laptops",  icon: <Laptop className="h-4 w-4" />,          label: "Laptops" },
  { to: "/jtc/admin/donations",icon: <Gift className="h-4 w-4" />,            label: "Donations" },
  { to: "/jtc/admin/requests", icon: <Inbox className="h-4 w-4" />,           label: "Requests" },
  { to: "/jtc/admin/store",    icon: <ShoppingBag className="h-4 w-4" />,     label: "Store Products" },
  { to: "/jtc/admin/orders",   icon: <ShoppingCart className="h-4 w-4" />,    label: "Store Orders" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useFonts();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const sidebarContent = (onLinkClick?: () => void) => (
    <>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <div
            className="font-bold text-lg tracking-tight"
            style={{ color: "#a78bfa", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            JTC
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
            Jordan Technology Center
          </div>
        </div>
        {/* Close button — mobile only */}
        {onLinkClick && (
          <button
            onClick={onLinkClick}
            className="text-slate-400 hover:text-white transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(n => (
          <NavItem
            key={n.to}
            to={n.to}
            icon={n.icon}
            label={n.label}
            active={n.to === "/jtc/admin" ? pathname === "/jtc/admin" : pathname.startsWith(n.to)}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      {/* Back link */}
      <div className="px-5 py-4 border-t border-white/5">
        <Link
          to="/jtc"
          className="text-xs transition-colors hover:text-slate-300"
          style={{ color: "#6b7280" }}
          onClick={onLinkClick}
        >
          ← Back to JTC site
        </Link>
      </div>
    </>
  );

  return (
    <div
      className="flex min-h-screen"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f8f9fb" }}
    >
      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <aside
        className="hidden lg:flex w-60 flex-shrink-0 flex-col"
        style={{ background: "#111827" }}
      >
        {sidebarContent()}
      </aside>

      {/* ── Mobile overlay + drawer ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside
            className="relative z-50 flex flex-col w-72 max-w-[85vw] h-full shadow-2xl"
            style={{ background: "#111827" }}
          >
            {sidebarContent(() => setSidebarOpen(false))}
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-slate-200 sticky top-0 z-30 bg-[#f8f9fb]"
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span
            className="font-bold text-base tracking-tight text-purple-600"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            JTC Admin
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}