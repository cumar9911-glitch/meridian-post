import type { Goal, Profile, Sex } from "./types";

export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiLabel(value: number): string {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Healthy";
  if (value < 30) return "Overweight";
  return "Obese";
}

/** Mifflin–St Jeor */
export function bmr(weightKg: number, heightCm: number, age: number, sex: Sex): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function tdee(bmrValue: number, activity: number): number {
  return bmrValue * activity;
}

export function targetCalories(tdeeValue: number, goal: Goal): number {
  if (goal === "lose") return Math.round(tdeeValue - 500);
  if (goal === "gain") return Math.round(tdeeValue + 350);
  return Math.round(tdeeValue);
}

/** US Navy body-fat estimate when circumference data is present */
export function bodyFatPct(profile: Profile): number | null {
  const { sex, heightCm, neckCm, waistCm, hipCm } = profile;
  if (!neckCm || !waistCm || heightCm <= 0) return null;

  if (sex === "male") {
    if (waistCm <= neckCm) return null;
    const v =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waistCm - neckCm) +
          0.15456 * Math.log10(heightCm)) -
      450;
    return clamp(v, 3, 60);
  }

  if (!hipCm) return null;
  if (waistCm + hipCm <= neckCm) return null;
  const v =
    495 /
      (1.29579 -
        0.35004 * Math.log10(waistCm + hipCm - neckCm) +
        0.221 * Math.log10(heightCm)) -
    450;
  return clamp(v, 5, 60);
}

export function weeklyChangeKg(goal: Goal): number {
  if (goal === "lose") return -0.5;
  if (goal === "gain") return 0.25;
  return 0;
}

export function goalCopy(goal: Goal): { title: string; blurb: string } {
  if (goal === "lose") {
    return {
      title: "Steady fat loss",
      blurb: "A gentle ~500 kcal deficit supports roughly 0.5 kg per week without crashing energy.",
    };
  }
  if (goal === "gain") {
    return {
      title: "Lean mass gain",
      blurb: "A modest surplus fuels muscle while keeping fat gain controlled.",
    };
  }
  return {
    title: "Hold & refine",
    blurb: "Eat at maintenance while you improve strength, sleep, and food quality.",
  };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export const ACTIVITY_OPTIONS = [
  { value: 1.2, label: "Sedentary", hint: "Desk work, little exercise" },
  { value: 1.375, label: "Light", hint: "1–3 workouts / week" },
  { value: 1.55, label: "Moderate", hint: "3–5 workouts / week" },
  { value: 1.725, label: "Active", hint: "6–7 workouts / week" },
  { value: 1.9, label: "Athlete", hint: "Hard training + physical job" },
] as const;
