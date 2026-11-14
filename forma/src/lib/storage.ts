import type { AppState, BodyScanResult, FoodLogEntry, Profile } from "./types";

const KEY = "forma-vitals-v1";

const empty: AppState = {
  profile: null,
  bodyScans: [],
  foodLog: [],
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw) as AppState;
    return {
      profile: parsed.profile ?? null,
      bodyScans: Array.isArray(parsed.bodyScans) ? parsed.bodyScans : [],
      foodLog: Array.isArray(parsed.foodLog) ? parsed.foodLog : [],
    };
  } catch {
    return { ...empty };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function saveProfile(profile: Profile): AppState {
  const state = loadState();
  state.profile = profile;
  saveState(state);
  return state;
}

export function addBodyScan(scan: BodyScanResult): AppState {
  const state = loadState();
  state.bodyScans = [scan, ...state.bodyScans].slice(0, 60);
  if (state.profile) {
    state.profile = { ...state.profile, weightKg: scan.weightKg, goal: scan.goal };
  }
  saveState(state);
  return state;
}

export function addFoodLog(entry: FoodLogEntry): AppState {
  const state = loadState();
  state.foodLog = [entry, ...state.foodLog].slice(0, 200);
  saveState(state);
  return state;
}

export function removeFoodLog(id: string): AppState {
  const state = loadState();
  state.foodLog = state.foodLog.filter((e) => e.id !== id);
  saveState(state);
  return state;
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function isSameDay(iso: string, day = todayKey()): boolean {
  return iso.slice(0, 10) === day;
}
