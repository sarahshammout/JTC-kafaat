import { useEffect} from "react";
import { Link, useLocation} from "react-router-dom";
import {
  LayoutDashboard, Laptop, Gift, Inbox, ShoppingBag, ShoppingCart,
} from "lucide-react";

// ── Font injection ───────────────────────────────────────────────────────
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

// ── Nav item ─────────────────────────────────────────────────────────────
function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? "bg-purple-600/20 text-purple-300" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      }`}
    >
      <span className={active ? "text-purple-400" : "text-slate-500"}>{icon}</span>
      {label}
    </Link>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────
const NAV = [
  { to: "/jtc/admin",         icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
  { to: "/jtc/admin/laptops", icon: <Laptop className="h-4 w-4" />,          label: "Laptops" },
  { to: "/jtc/admin/donations",icon: <Gift className="h-4 w-4" />,           label: "Donations" },
  { to: "/jtc/admin/requests", icon: <Inbox className="h-4 w-4" />,          label: "Requests" },
  { to: "/jtc/admin/store",    icon: <ShoppingBag className="h-4 w-4" />,    label: "Store Products" },
  { to: "/jtc/admin/orders",   icon: <ShoppingCart className="h-4 w-4" />,   label: "Store Orders" },
];

// ── Layout ────────────────────────────────────────────────────────────────
export default function AppLayout({ children }: { children: React.ReactNode }) {
  useFonts();
  const { pathname } = useLocation();

  return (
    <div
      className="flex min-h-screen"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "#f8f9fb",
      }}
    >
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col"
        style={{ background: "#111827" }}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/5">
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

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(n => (
            <NavItem
              key={n.to}
              to={n.to}
              icon={n.icon}
              label={n.label}
              // exact match for dashboard, startsWith for the rest
              active={n.to === "/jtc/admin" ? pathname === "/jtc/admin" : pathname.startsWith(n.to)}
            />
          ))}
        </nav>

        {/* Back link */}
        <div className="px-5 py-4 border-t border-white/5">
          <Link
            to="/jtc"
            className="text-xs transition-colors hover:text-slate-300"
            style={{ color: "#6b7280" }}
          >
            ← Back to JTC site
          </Link>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 lg:px-10 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}