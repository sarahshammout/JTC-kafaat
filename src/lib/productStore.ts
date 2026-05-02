import type { ProductEntry, OrderEntry } from "./adminShared";

const PRODUCTS_KEY = "jtc-products";
const ORDERS_KEY   = "jtc-orders";

// ── Products ──────────────────────────────────────────────────────────────
export function getProducts(): ProductEntry[] {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (data) return JSON.parse(data);
  const seed: ProductEntry[] = [
    { id: "P001", name: "Embroidered Cushion Cover", category: "Home Decor",  maker: "Fatima H.", price: 25, status: "in-stock" },
    { id: "P002", name: "Olive Oil Soap Set",         category: "Beauty",      maker: "Nour A.",   price: 12, status: "in-stock" },
    { id: "P003", name: "Crochet Market Bag",          category: "Accessories", maker: "Rania M.",  price: 15, status: "in-stock" },
    { id: "P004", name: "Ceramic Coffee Cup",          category: "Kitchen",     maker: "Huda S.",   price: 18, status: "in-stock" },
    { id: "P005", name: "Woven Table Runner",          category: "Home Decor",  maker: "Samira K.", price: 35, status: "in-stock" },
    { id: "P006", name: "Hand-painted Tote Bag",       category: "Accessories", maker: "Lara T.",   price: 22, status: "out-of-stock" },
  ];
  saveProducts(seed);
  return seed;
}

export function saveProducts(products: ProductEntry[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(data: Omit<ProductEntry, "id">): ProductEntry {
  const product: ProductEntry = { ...data, id: `P${Date.now()}` };
  const existing = getProducts();
  saveProducts([...existing, product]);
  return product;
}

export function updateProduct(updated: ProductEntry): void {
  saveProducts(getProducts().map(p => p.id === updated.id ? updated : p));
}

export function deleteProduct(id: string): void {
  saveProducts(getProducts().filter(p => p.id !== id));
}

// ── Orders ────────────────────────────────────────────────────────────────
export function getOrders(): OrderEntry[] {
  const data = localStorage.getItem(ORDERS_KEY);
  if (data) return JSON.parse(data);
  const seed: OrderEntry[] = [
    { id: "O001", customer: "Hana Mroueh",  items: "Olive Oil Soap Set × 2",                                 total: 24, payment: "Cash on Delivery", status: "pending",   date: "2025-04-13" },
    { id: "O002", customer: "Basem Najjar", items: "Ceramic Coffee Cup × 1",                                 total: 18, payment: "Online",           status: "confirmed", date: "2025-04-11" },
    { id: "O003", customer: "Rana Tawil",   items: "Embroidered Cushion Cover × 1, Woven Table Runner × 1",  total: 60, payment: "Online",           status: "shipped",   date: "2025-04-09" },
  ];
  saveOrders(seed);
  return seed;
}

export function saveOrders(orders: OrderEntry[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}