import type { DonationEntry, RequestEntry } from "./adminShared";

const DONATIONS_KEY = "jtc-donations";
const REQUESTS_KEY  = "jtc-requests";

// ── Donations ─────────────────────────────────────────────────────────────
export function getDonations(): DonationEntry[] {
  const data = localStorage.getItem(DONATIONS_KEY);
  if (data) return JSON.parse(data);
  // seed with mock data on first load
  const seed: DonationEntry[] = [
    { id: "D001", donorName: "Ahmad Al-Rashidi", phone: "+962 79 123 4567", email: "ahmad@mail.com",  brand: "Dell",  model: "Latitude 5520",    serial: "SN123456", notes: "Screen has minor scratch",  submitted: "2025-04-12" },
    { id: "D002", donorName: "Sara Khalil",       phone: "+962 78 987 6543", email: "sara.k@mail.com", brand: "HP",    model: "EliteBook 840",    serial: "HP789012", notes: "Good condition",            submitted: "2025-04-10" },
    { id: "D003", donorName: "Lina Farhat",       phone: "+962 79 321 0987", email: "",                brand: "Apple", model: "MacBook Air 2019", serial: "",         notes: "Battery replaced recently", submitted: "2025-04-07" },
  ];
  saveDonations(seed);
  return seed;
}

export function saveDonations(items: DonationEntry[]): void {
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(items));
}

export function addDonation(data: Omit<DonationEntry, "id" | "submitted">): DonationEntry {
  const entry: DonationEntry = {
    ...data,
    id: `D${Date.now()}`,
    submitted: new Date().toISOString().slice(0, 10),
  };
  const existing = getDonations();
  saveDonations([entry, ...existing]);
  return entry;
}

// ── Requests ──────────────────────────────────────────────────────────────
export function getRequests(): RequestEntry[] {
  const data = localStorage.getItem(REQUESTS_KEY);
  if (data) return JSON.parse(data);
  // seed with mock data on first load
  const seed: RequestEntry[] = [
    { id: "R001", name: "Fatima Al-Zoubi", age: 20, gender: "Female", city: "Amman",  reason: "University student, need laptop for remote classes",  submitted: "2025-04-13" },
    { id: "R002", name: "Khalid Ibrahim",  age: 28, gender: "Male",   city: "Irbid",  reason: "Looking for work, need laptop for job applications",   submitted: "2025-04-11" },
    { id: "R003", name: "Nour Sami",       age: 17, gender: "Female", city: "Zarqa",  reason: "High school student preparing for tawjihi exams",     submitted: "2025-04-09" },
    { id: "R004", name: "Rami Haddad",     age: 32, gender: "Male",   city: "Aqaba",  reason: "Freelance designer, laptop broke, need replacement",   submitted: "2025-04-08" },
    { id: "R005", name: "Dina Qasim",      age: 38, gender: "Female", city: "Madaba", reason: "Single mother, children need laptop for school",       submitted: "2025-04-06" },
  ];
  saveRequests(seed);
  return seed;
}

export function saveRequests(items: RequestEntry[]): void {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(items));
}

export function addRequest(data: Omit<RequestEntry, "id" | "submitted">): RequestEntry {
  const entry: RequestEntry = {
    ...data,
    id: `R${Date.now()}`,
    submitted: new Date().toISOString().slice(0, 10),
  };
  const existing = getRequests();
  saveRequests([entry, ...existing]);
  return entry;
}