import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Th, Td, StatCard, Field, Modal, inputCls } from "@/lib/adminShared";
import type { ProductEntry } from "@/lib/adminShared";
import { getProducts, addProduct, deleteProduct } from "@/lib/productStore";

export default function StoreProducts() {
  const [products, setProducts] = useState<ProductEntry[]>(getProducts);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", maker: "", price: "" });

  const f = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const inStock  = products.filter(p => p.status === "in-stock").length;

  const add = () => {
  if (!form.name) return;
  addProduct({
    name: form.name, category: form.category,
    maker: form.maker, price: parseFloat(form.price) || 0,
    status: "in-stock",
  });
  setProducts(getProducts());
  setShowModal(false);
  setForm({ name: "", category: "", maker: "", price: "" });
}

  return (
    <div className="space-y-6">
      <div  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            Mashghool Store
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage products and track orders</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Products"  value={products.length}    emoji="📦" color="text-blue-500" />
        <StatCard label="In Stock"  value={inStock}             emoji="✅" color="text-green-500" />
        <StatCard label="Orders"    value={0}                   emoji="👥" color="text-amber-500" />
        <StatCard label="Revenue"   value="0 JOD"               emoji="$"  color="text-green-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-700">Products</h2>
          <p className="text-xs text-slate-400 mt-0.5">All Mashghool handmade products</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>{["Product","Category","Maker","Price","Status","Actions"].map(h => <Th key={h}>{h}</Th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <Td><span className="font-medium">{p.name}</span></Td>
                  <Td><span className="text-xs border border-slate-200 text-slate-500 px-2.5 py-0.5 rounded-full">{p.category}</span></Td>
                  <Td>{p.maker}</Td>
                  <Td>{p.price} JOD</Td>
                  <Td>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === "in-stock" ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                      {p.status === "in-stock" ? "In Stock" : "Out of Stock"}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex gap-3">
                      <button className="text-slate-300 hover:text-purple-500 transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { deleteProduct(p.id); setProducts(getProducts()); }} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title="Add Product" onClose={() => setShowModal(false)}>
          <Field label="Product Name *"><input className={inputCls} placeholder="e.g. Hand-painted Tote Bag" value={form.name} onChange={f("name")} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category"><input className={inputCls} placeholder="e.g. Accessories" value={form.category} onChange={f("category")} /></Field>
            <Field label="Maker"><input className={inputCls} placeholder="e.g. Huda S." value={form.maker} onChange={f("maker")} /></Field>
            <Field label="Price (JOD)"><input type="number" className={inputCls} placeholder="0.00" value={form.price} onChange={f("price")} /></Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={add} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">Add Product</button>
            <button onClick={() => setShowModal(false)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}