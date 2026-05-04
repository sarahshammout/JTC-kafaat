import { useState } from "react";
import { Laptop } from "lucide-react";
import { Th, Td, StatCard, Field, PhaseBadge, inputCls } from "@/lib/adminShared";
import type { LaptopEntry } from "@/lib/adminShared";
import { getLaptops } from "@/lib/laptopStore";

export default function Dashboard() {
  const [laptops] = useState<LaptopEntry[]>(getLaptops);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [city, setCity] = useState("all");

  const cities = Array.from(new Set(laptops.map(l => l.city)));

  const filtered = laptops.filter(l => {
    if (city !== "all" && l.city !== city) return false;
    if (fromDate && l.dateDonated < fromDate) return false;
    if (toDate && l.dateDonated > toDate) return false;
    return true;
  });

  const available   = filtered.filter(l => l.phase === "available").length;
  const fixing      = filtered.filter(l => l.phase === "fixing").length;
  const distributed = filtered.filter(l => l.phase === "distributed").length;
  const totalCost   = filtered.reduce((s, l) => s + l.repairCost, 0);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">Overview of all laptop donations and distributions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="From Date">
            <input type="date" className={inputCls} value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </Field>
          <Field label="To Date">
            <input type="date" className={inputCls} value={toDate} onChange={e => setToDate(e.target.value)} />
          </Field>
          <Field label="City">
            <div className="relative">
              <select className={inputCls + " appearance-none pr-8"} value={city} onChange={e => setCity(e.target.value)}>
                <option value="all">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </Field>
          <Field label="Gender">
            <div className="relative">
              <select className={inputCls + " appearance-none pr-8"}>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </Field>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Available"     value={available}                      emoji="🖥️" color="text-blue-500" />
        <StatCard label="Being Fixed"   value={fixing}                         emoji="🔧" color="text-amber-500" />
        <StatCard label="Distributed"   value={distributed}                    emoji="🎁" color="text-green-500" />
        <StatCard label="Repair Cost"   value={`${totalCost.toFixed(2)} JOD`} emoji="$"  color="text-red-500" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 sm:px-5 py-4 border-b border-slate-100">
          <Laptop className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-slate-700 text-sm sm:text-base">Total Laptops: {filtered.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50">
              <tr>{["Brand / Model","Donor","Date Donated","Phase","Repair Cost","Recipient","City"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0
                ? <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No laptops match the current filters.</td></tr>
                : filtered.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td><span className="font-medium">{l.brand} {l.model}</span></Td>
                    <Td>{l.donor}</Td>
                    <Td>{l.dateDonated}</Td>
                    <Td><PhaseBadge phase={l.phase} /></Td>
                    <Td>{l.repairCost > 0 ? `${l.repairCost} JOD` : "—"}</Td>
                    <Td>{l.recipient || "—"}</Td>
                    <Td>{l.city}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}