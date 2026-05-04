import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Th, Td, Field, Modal, PhaseBadge, inputCls } from "@/lib/adminShared";
import type { LaptopEntry, LaptopPhase } from "@/lib/adminShared";
import { getLaptops, addLaptop, deleteLaptop } from "@/lib/laptopStore";

export default function Laptops() {
  const [laptops, setLaptops] = useState<LaptopEntry[]>(getLaptops());
  const [tab, setTab] = useState<"all" | LaptopPhase>("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ brand: "", model: "", donor: "", dateDonated: "", city: "", repairCost: "" });

  const f = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const tabs: Array<"all" | LaptopPhase> = ["all", "available", "fixing", "distributed"];
  const tabLabel: Record<string, string> = { all: "All", available: "Available", fixing: "Fixing", distributed: "Distributed" };
  const count = (t: "all" | LaptopPhase) => t === "all" ? laptops.length : laptops.filter(l => l.phase === t).length;
  const filtered = tab === "all" ? laptops : laptops.filter(l => l.phase === tab);

  const add = () => {
    if (!form.brand || !form.model) return;
    const newLaptop = addLaptop({
      brand: form.brand, model: form.model, donor: form.donor,
      dateDonated: form.dateDonated || new Date().toISOString().slice(0, 10),
      phase: "available",
      repairCost: parseFloat(form.repairCost) || 0,
      recipient: "", city: form.city,
    });
    setLaptops(prev => [newLaptop, ...prev]);
    setShowModal(false);
    setForm({ brand: "", model: "", donor: "", dateDonated: "", city: "", repairCost: "" });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            Laptops
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all laptops in the system</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" /> Add Laptop
        </button>
      </div>

      {/* Phase tabs — horizontally scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium border transition-all whitespace-nowrap flex-shrink-0 ${
              tab === t
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white border-slate-200 text-slate-600 hover:border-purple-300"
            }`}
          >
            {tabLabel[t]} ({count(t)})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead className="bg-slate-50">
              <tr>{["Brand / Model","Donor","Date Donated","Phase","Repair Cost","Recipient","Actions"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0
                ? <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No laptops found. Add one to get started.</td></tr>
                : filtered.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td><span className="font-medium">{l.brand} {l.model}</span></Td>
                    <Td>{l.donor || "—"}</Td>
                    <Td>{l.dateDonated}</Td>
                    <Td><PhaseBadge phase={l.phase} /></Td>
                    <Td>{l.repairCost > 0 ? `${l.repairCost} JOD` : "—"}</Td>
                    <Td>{l.recipient || "—"}</Td>
                    <Td>
                      <div className="flex gap-3">
                        <button className="text-slate-300 hover:text-purple-500 transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button
                          onClick={() => {
                            deleteLaptop(l.id);
                            setLaptops(p => p.filter(x => x.id !== l.id));
                          }}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Add Laptop" onClose={() => setShowModal(false)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand *"><input className={inputCls} placeholder="e.g. Dell" value={form.brand} onChange={f("brand")} /></Field>
            <Field label="Model *"><input className={inputCls} placeholder="e.g. Latitude 5520" value={form.model} onChange={f("model")} /></Field>
            <Field label="Donor Name"><input className={inputCls} placeholder="Full name" value={form.donor} onChange={f("donor")} /></Field>
            <Field label="Date Donated"><input type="date" className={inputCls} value={form.dateDonated} onChange={f("dateDonated")} /></Field>
            <Field label="City"><input className={inputCls} placeholder="e.g. Amman" value={form.city} onChange={f("city")} /></Field>
            <Field label="Repair Cost (JOD)"><input type="number" className={inputCls} placeholder="0.00" value={form.repairCost} onChange={f("repairCost")} /></Field>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={add} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">Add Laptop</button>
            <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}