// ── Types ────────────────────────────────────────────────────────────────
export type LaptopPhase = "available" | "fixing" | "distributed";
 
export interface LaptopEntry {
  id: string; brand: string; model: string; donor: string;
  dateDonated: string; phase: LaptopPhase; repairCost: number;
  recipient: string; city: string;
}
export interface DonationEntry {
  id: string; donorName: string; phone: string; email: string;
  brand: string; model: string; serial: string; notes: string; submitted: string;
}
export interface RequestEntry {
  id: string; name: string; age: number; gender: string;
  city: string; reason: string; submitted: string;
}
export interface ProductEntry {
  id: string; name: string; category: string; maker: string;
  price: number; status: "in-stock" | "out-of-stock";
}
export interface OrderEntry {
  id: string; customer: string; items: string; total: number;
  payment: string; status: "pending" | "confirmed" | "shipped" | "delivered";
  date: string;
} 
// ── Shared styles ────────────────────────────────────────────────────────
export const inputCls = "w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-slate-800";
 
// ── Shared UI components ─────────────────────────────────────────────────
export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="...">{children}</th>
  );
}
 
export function Td({ children, cls = "" }: { children: React.ReactNode; cls?: string }) {
  return <td className={`px-4 py-3.5 text-sm text-slate-700 ${cls}`}>{children}</td>;
}
 
export function StatCard({ label, value, emoji, color }: { label: string; value: string | number; emoji: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-start justify-between shadow-sm">
      <div>
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <span className={`text-xl ${color}`}>{emoji}</span>
    </div>
  );
}
 
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
 
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}
 
export function PhaseBadge({ phase }: { phase: LaptopPhase }) {
  const map: Record<LaptopPhase, string> = {
    available:   "bg-blue-100 text-blue-700",
    fixing:      "bg-amber-100 text-amber-700",
    distributed: "bg-green-100 text-green-700",
  };
  const labels: Record<LaptopPhase, string> = {
    available: "Available", fixing: "Fixing", distributed: "Distributed",
  };
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${map[phase]}`}>
      {labels[phase]}
    </span>
  );
}