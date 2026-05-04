import { useState } from "react";
import { Inbox } from "lucide-react";
import { Th, Td } from "@/lib/adminShared";
import { getRequests } from "@/lib/submissionStore";

export default function Requests() {
  const [requests] = useState(getRequests);

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          Laptop Requests
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">Laptop requests submitted through the website</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 sm:px-5 py-4 border-b border-slate-100">
          <Inbox className="h-4 w-4 text-purple-500" />
          <span className="font-semibold text-slate-700 text-sm sm:text-base">Total: {requests.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead className="bg-slate-50">
              <tr>{["Name","Age","Gender","City","Reason","Submitted"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.length === 0
                ? <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400 text-sm">No laptop requests yet.</td></tr>
                : requests.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td><span className="font-medium">{r.name}</span></Td>
                    <Td>{r.age}</Td>
                    <Td>{r.gender}</Td>
                    <Td>{r.city}</Td>
                    <Td cls="max-w-[160px] sm:max-w-[200px]"><span className="text-slate-400 text-xs truncate block">{r.reason}</span></Td>
                    <Td>{r.submitted}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}