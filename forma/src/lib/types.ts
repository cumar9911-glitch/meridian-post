export type Goal = "lose" | "maintain" | "gain";
export type Sex = "male" | "female";
export type View = "home" | "body" | "food" | "dashboard";

export interface Profile {
  name: string;
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  neckCm?: number;
  waistCm?: number;
  hipCm?: number;
  goal: Goal;
  activity: number;
}

export interface BodyScanResult {
  id: string;
  at: string;
  weightKg: number;
  bmi: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  bodyFatPct: number | null;
  goal: Goal;
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  serving: string;
  calories: number;
  fat: number;
  sugar: number;
  carbs: number;
  protein: number;
  imageUrl?: string;
  source: "openfoodfacts" | "manual" | "sample";
}

export interface FoodLogEntry {
  id: string;
  at: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  food: FoodItem;
  servings: number;
}

export interface AppState {
  profile: Profile | null;
  bodyScans: BodyScanResult[];
  foodLog: FoodLogEntry[];
}
