import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Th, Td } from "@/lib/adminShared";
import type { OrderEntry } from "@/lib/adminShared";
import { getOrders} from "@/lib/productStore";

const STATUS_COLOR: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped:   "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export default function StoreOrders() { 
  const [orders] = useState<OrderEntry[]>(getOrders);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          Store Orders
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage customer orders from the Mashghool store</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">All Orders</h2>
          <p className="text-xs text-slate-400">{orders.length} total orders</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>{["Customer","Items","Total","Payment","Status","Date","Actions"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.length === 0
                ? <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No orders yet.</td></tr>
                : orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                    <Td><span className="font-medium">{o.customer}</span></Td>
                    <Td cls="max-w-[180px]"><span className="text-xs text-slate-400 truncate block">{o.items}</span></Td>
                    <Td>{o.total} JOD</Td>
                    <Td>{o.payment}</Td>
                    <Td>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[o.status]}`}>
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </Td>
                    <Td>{o.date}</Td>
                    <Td>
                      <div className="flex gap-3">
                        <button className="text-slate-300 hover:text-purple-500 transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}