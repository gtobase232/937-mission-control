const BASE_PATH = "/937-mission-control";

// Map of API endpoint -> { file, key } where key is the property to extract (null = return whole object)
const RESOURCE_MAP: Record<string, { file: string; key: string | null }> = {
  tasks: { file: "tasks.json", key: "tasks" },
  calendar: { file: "calendar.json", key: "events" },
  content: { file: "content.json", key: "posts" },
  docs: { file: "docs.json", key: "documents" },
  leads: { file: "leads.json", key: "leads" },
  projects: { file: "projects.json", key: "projects" },
  team: { file: "team.json", key: "members" },
  finance: { file: "finance.json", key: null },
  analytics: { file: "analytics.json", key: null },
};

function storageKey(resource: string): string {
  return `mc_${resource}`;
}

async function fetchStatic<T>(resource: string): Promise<T> {
  const config = RESOURCE_MAP[resource];
  if (!config) throw new Error(`Unknown resource: ${resource}`);

  // Check localStorage for mutations first
  const stored = localStorage.getItem(storageKey(resource));
  if (stored) {
    return JSON.parse(stored) as T;
  }

  // Fetch from static JSON
  const res = await fetch(`${BASE_PATH}/data/${config.file}`);
  const data = await res.json();
  const result = config.key ? data[config.key] : data;

  // Cache in localStorage
  localStorage.setItem(storageKey(resource), JSON.stringify(result));
  return result as T;
}

function persist<T>(resource: string, data: T): void {
  localStorage.setItem(storageKey(resource), JSON.stringify(data));
}

// Generic CRUD operations for array-based resources
export async function getAll<T>(resource: string): Promise<T[]> {
  return fetchStatic<T[]>(resource);
}

export async function getObject<T>(resource: string): Promise<T> {
  return fetchStatic<T>(resource);
}

export async function create<T extends { id?: string }>(
  resource: string,
  item: Omit<T, "id">
): Promise<T> {
  const items = await getAll<T>(resource);
  const newItem = {
    ...item,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    createdAt: new Date().toISOString(),
  } as unknown as T;
  items.push(newItem);
  persist(resource, items);
  return newItem;
}

export async function update<T extends { id: string }>(
  resource: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const items = await getAll<T>(resource);
  const index = items.findIndex((item) => (item as T).id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  persist(resource, items);
  return items[index];
}

export async function remove<T extends { id: string }>(
  resource: string,
  id: string
): Promise<boolean> {
  const items = await getAll<T>(resource);
  const filtered = items.filter((item) => (item as T).id !== id);
  if (filtered.length === items.length) return false;
  persist(resource, filtered);
  return true;
}
