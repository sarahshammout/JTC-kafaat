import { useState } from "react";
import { Gift } from "lucide-react";
import { getDonations } from "@/lib/submissionStore";
import { Th, Td } from "@/lib/adminShared";

export default function Donations() {
  const [donations] = useState(getDonations);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          Donation Submissions
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">Laptop donations submitted through the website</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
          <Gift className="h-4 w-4 text-purple-500" />
          <span className="font-semibold text-slate-700">Total: {donations.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>{["Donor Name","Phone","Email","Brand / Model","Serial #","Notes","Submitted"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {donations.length === 0
                ? <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No donation submissions yet.</td></tr>
                : donations.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td><span className="font-medium">{d.donorName}</span></Td>
                    <Td>{d.phone}</Td>
                    <Td>{d.email || "—"}</Td>
                    <Td>{d.brand} {d.model}</Td>
                    <Td><span className="font-mono text-xs text-slate-400">{d.serial || "—"}</span></Td>
                    <Td cls="max-w-[160px]"><span className="truncate block text-slate-400 text-xs">{d.notes || "—"}</span></Td>
                    <Td>{d.submitted}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}