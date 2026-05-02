import type { LaptopEntry, LaptopPhase } from "./adminShared";

const KEY = "jtc-laptops";

export function getLaptops(): LaptopEntry[] {
  const data = localStorage.getItem(KEY);
  if (data) return JSON.parse(data);
  // seed with mock data on first load
  const seed: LaptopEntry[] = [
    { id: "L001", brand: "Dell",    model: "Latitude 5520",    donor: "Ahmad Al-Rashidi", dateDonated: "2025-04-12", phase: "fixing",      repairCost: 25, recipient: "",               city: "Amman" },
    { id: "L002", brand: "HP",      model: "EliteBook 840",    donor: "Sara Khalil",      dateDonated: "2025-04-10", phase: "available",   repairCost: 0,  recipient: "",               city: "Irbid" },
    { id: "L003", brand: "Lenovo",  model: "ThinkPad X1",      donor: "Omar Nasser",      dateDonated: "2025-04-08", phase: "distributed", repairCost: 40, recipient: "Nour Sami",      city: "Zarqa" },
    { id: "L004", brand: "Apple",   model: "MacBook Air 2019", donor: "Lina Farhat",      dateDonated: "2025-04-07", phase: "available",   repairCost: 0,  recipient: "",               city: "Amman" },
    { id: "L005", brand: "Asus",    model: "ZenBook 14",       donor: "Yousef Mansour",   dateDonated: "2025-04-05", phase: "distributed", repairCost: 15, recipient: "Khalid Ibrahim", city: "Irbid" },
    { id: "L006", brand: "Toshiba", model: "Satellite Pro",    donor: "Rima Abboud",      dateDonated: "2025-03-30", phase: "fixing",      repairCost: 60, recipient: "",               city: "Aqaba" },
  ];
  saveLaptops(seed);
  return seed;
}

export function saveLaptops(laptops: LaptopEntry[]): void {
  localStorage.setItem(KEY, JSON.stringify(laptops));
}

export function addLaptop(laptop: Omit<LaptopEntry, "id">): LaptopEntry {
  const newLaptop: LaptopEntry = { ...laptop, id: `L${Date.now()}` };
  const laptops = getLaptops();
  laptops.unshift(newLaptop);
  saveLaptops(laptops);
  return newLaptop;
}

export function updateLaptop(updated: LaptopEntry): void {
  const laptops = getLaptops().map(l => l.id === updated.id ? updated : l);
  saveLaptops(laptops);
}

export function deleteLaptop(id: string): void {
  saveLaptops(getLaptops().filter(l => l.id !== id));
}

export function updateLaptopPhase(id: string, phase: LaptopPhase): void {
  const laptops = getLaptops().map(l => l.id === id ? { ...l, phase } : l);
  saveLaptops(laptops);
}