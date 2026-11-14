import type { FoodItem } from "./types";

const SAMPLE_FOODS: FoodItem[] = [
  {
    id: "sample-apple",
    name: "Apple",
    serving: "1 medium (182 g)",
    calories: 95,
    fat: 0.3,
    sugar: 19,
    carbs: 25,
    protein: 0.5,
    source: "sample",
  },
  {
    id: "sample-banana",
    name: "Banana",
    serving: "1 medium (118 g)",
    calories: 105,
    fat: 0.4,
    sugar: 14,
    carbs: 27,
    protein: 1.3,
    source: "sample",
  },
  {
    id: "sample-orange",
    name: "Orange",
    serving: "1 medium (131 g)",
    calories: 62,
    fat: 0.2,
    sugar: 12,
    carbs: 15,
    protein: 1.2,
    source: "sample",
  },
  {
    id: "sample-berries",
    name: "Mixed berries",
    serving: "1 cup (140 g)",
    calories: 70,
    fat: 0.5,
    sugar: 10,
    carbs: 17,
    protein: 1,
    source: "sample",
  },
  {
    id: "sample-chicken",
    name: "Grilled chicken breast",
    serving: "100 g",
    calories: 165,
    fat: 3.6,
    sugar: 0,
    carbs: 0,
    protein: 31,
    source: "sample",
  },
  {
    id: "sample-salmon",
    name: "Atlantic salmon",
    serving: "100 g",
    calories: 208,
    fat: 13,
    sugar: 0,
    carbs: 0,
    protein: 20,
    source: "sample",
  },
  {
    id: "sample-tuna",
    name: "Tuna, canned in water",
    serving: "1 can drained (165 g)",
    calories: 191,
    fat: 1.4,
    sugar: 0,
    carbs: 0,
    protein: 42,
    source: "sample",
  },
  {
    id: "sample-turkey",
    name: "Turkey breast, roasted",
    serving: "100 g",
    calories: 135,
    fat: 1.5,
    sugar: 0,
    carbs: 0,
    protein: 30,
    source: "sample",
  },
  {
    id: "sample-oats",
    name: "Rolled oats",
    serving: "40 g dry",
    calories: 150,
    fat: 3,
    sugar: 0.4,
    carbs: 27,
    protein: 5,
    source: "sample",
  },
  {
    id: "sample-yogurt",
    name: "Greek yogurt, plain",
    serving: "170 g",
    calories: 100,
    fat: 0.7,
    sugar: 6,
    carbs: 6,
    protein: 17,
    source: "sample",
  },
  {
    id: "sample-milk",
    name: "Whole milk",
    serving: "250 ml",
    calories: 149,
    fat: 8,
    sugar: 12,
    carbs: 12,
    protein: 8,
    source: "sample",
  },
  {
    id: "sample-avocado",
    name: "Avocado",
    serving: "1/2 fruit (68 g)",
    calories: 114,
    fat: 10.5,
    sugar: 0.3,
    carbs: 6,
    protein: 1.3,
    source: "sample",
  },
  {
    id: "sample-rice",
    name: "Brown rice, cooked",
    serving: "150 g",
    calories: 170,
    fat: 1.5,
    sugar: 0.4,
    carbs: 35,
    protein: 4,
    source: "sample",
  },
  {
    id: "sample-quinoa",
    name: "Quinoa, cooked",
    serving: "185 g",
    calories: 222,
    fat: 3.6,
    sugar: 0.9,
    carbs: 39,
    protein: 8,
    source: "sample",
  },
  {
    id: "sample-eggs",
    name: "Eggs, scrambled",
    serving: "2 large",
    calories: 182,
    fat: 13,
    sugar: 0.8,
    carbs: 2,
    protein: 12,
    source: "sample",
  },
  {
    id: "sample-toast",
    name: "Wholegrain toast",
    serving: "1 slice (38 g)",
    calories: 92,
    fat: 1.5,
    sugar: 1.8,
    carbs: 16,
    protein: 4,
    source: "sample",
  },
  {
    id: "sample-cola",
    name: "Cola soft drink",
    serving: "330 ml can",
    calories: 139,
    fat: 0,
    sugar: 35,
    carbs: 35,
    protein: 0,
    source: "sample",
  },
  {
    id: "sample-smoothie",
    name: "Green smoothie",
    serving: "350 ml",
    calories: 180,
    fat: 2,
    sugar: 28,
    carbs: 36,
    protein: 4,
    source: "sample",
  },
  {
    id: "sample-salad",
    name: "Mixed green salad",
    serving: "1 bowl (200 g)",
    calories: 70,
    fat: 3,
    sugar: 4,
    carbs: 8,
    protein: 3,
    source: "sample",
  },
  {
    id: "sample-broccoli",
    name: "Steamed broccoli",
    serving: "100 g",
    calories: 35,
    fat: 0.4,
    sugar: 1.7,
    carbs: 7,
    protein: 2.4,
    source: "sample",
  },
  {
    id: "sample-sweet-potato",
    name: "Baked sweet potato",
    serving: "1 medium (130 g)",
    calories: 112,
    fat: 0.1,
    sugar: 8,
    carbs: 26,
    protein: 2,
    source: "sample",
  },
  {
    id: "sample-protein-bar",
    name: "Protein bar",
    serving: "1 bar (60 g)",
    calories: 220,
    fat: 8,
    sugar: 12,
    carbs: 22,
    protein: 20,
    source: "sample",
  },
  {
    id: "sample-almonds",
    name: "Almonds",
    serving: "28 g (handful)",
    calories: 164,
    fat: 14,
    sugar: 1.2,
    carbs: 6,
    protein: 6,
    source: "sample",
  },
  {
    id: "sample-peanut-butter",
    name: "Peanut butter",
    serving: "2 tbsp (32 g)",
    calories: 188,
    fat: 16,
    sugar: 3,
    carbs: 6,
    protein: 8,
    source: "sample",
  },
  {
    id: "sample-pasta",
    name: "Pasta, cooked",
    serving: "140 g",
    calories: 220,
    fat: 1.3,
    sugar: 0.8,
    carbs: 43,
    protein: 8,
    source: "sample",
  },
  {
    id: "sample-burger",
    name: "Beef burger patty",
    serving: "1 patty (113 g)",
    calories: 278,
    fat: 20,
    sugar: 0,
    carbs: 0,
    protein: 25,
    source: "sample",
  },
  {
    id: "sample-pizza",
    name: "Cheese pizza slice",
    serving: "1 slice (100 g)",
    calories: 266,
    fat: 10,
    sugar: 3.6,
    carbs: 33,
    protein: 11,
    source: "sample",
  },
  {
    id: "sample-fries",
    name: "French fries",
    serving: "medium (117 g)",
    calories: 365,
    fat: 17,
    sugar: 0.4,
    carbs: 48,
    protein: 4,
    source: "sample",
  },
  {
    id: "sample-chocolate",
    name: "Dark chocolate",
    serving: "30 g",
    calories: 170,
    fat: 12,
    sugar: 7,
    carbs: 13,
    protein: 2,
    source: "sample",
  },
  {
    id: "sample-hummus",
    name: "Hummus",
    serving: "2 tbsp (30 g)",
    calories: 70,
    fat: 5,
    sugar: 0.3,
    carbs: 4,
    protein: 2,
    source: "sample",
  },
];

type OffProduct = {
  code?: string;
  product_name?: string;
  brands?: string;
  image_front_small_url?: string;
  image_url?: string;
  serving_size?: string;
  nutriments?: Record<string, number | undefined>;
};

function mapProduct(p: OffProduct, fallbackId: string): FoodItem | null {
  const name = p.product_name?.trim();
  if (!name) return null;
  const n = p.nutriments ?? {};
  const calories =
    n["energy-kcal_serving"] ??
    n["energy-kcal_100g"] ??
    (n["energy_serving"] ? n["energy_serving"] / 4.184 : undefined) ??
    (n["energy_100g"] ? n["energy_100g"] / 4.184 : 0);

  return {
    id: p.code ? `off-${p.code}` : fallbackId,
    name,
    brand: p.brands?.split(",")[0]?.trim(),
    serving: p.serving_size?.trim() || "per 100 g",
    calories: Math.round(Number(calories) || 0),
    fat: round1(n.fat_serving ?? n.fat_100g ?? 0),
    sugar: round1(n.sugars_serving ?? n.sugars_100g ?? 0),
    carbs: round1(n.carbohydrates_serving ?? n.carbohydrates_100g ?? 0),
    protein: round1(n.proteins_serving ?? n.proteins_100g ?? 0),
    imageUrl: p.image_front_small_url || p.image_url,
    source: "openfoodfacts",
  };
}

function round1(n: number | undefined): number {
  return Math.round((Number(n) || 0) * 10) / 10;
}

export function sampleFoods(): FoodItem[] {
  return SAMPLE_FOODS;
}

export function searchSample(query: string): FoodItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return SAMPLE_FOODS;
  return SAMPLE_FOODS.filter(
    (f) => f.name.toLowerCase().includes(q) || f.id.includes(q),
  );
}

async function searchOpenFoodFacts(query: string): Promise<FoodItem[]> {
  const url = new URL("https://world.openfoodfacts.org/cgi/search.pl");
  url.searchParams.set("search_terms", query);
  url.searchParams.set("search_simple", "1");
  url.searchParams.set("action", "process");
  url.searchParams.set("json", "1");
  url.searchParams.set("page_size", "10");
  url.searchParams.set(
    "fields",
    "code,product_name,brands,image_front_small_url,image_url,serving_size,nutriments",
  );

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OFF search ${res.status}`);
  const data = (await res.json()) as { products?: OffProduct[] };
  return (
    data.products
      ?.map((p, i) => mapProduct(p, `off-search-${i}`))
      .filter((x): x is FoodItem => Boolean(x)) ?? []
  );
}

async function searchViaSearchEngine(query: string): Promise<FoodItem[]> {
  const url = new URL("https://search.openfoodfacts.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "8");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OFF engine ${res.status}`);
  const data = (await res.json()) as { hits?: { code?: string }[] };
  const codes = (data.hits ?? [])
    .map((h) => h.code)
    .filter((c): c is string => Boolean(c))
    .slice(0, 6);

  const products = await Promise.all(codes.map((code) => lookupBarcode(code)));
  return products.filter((p): p is FoodItem => Boolean(p));
}

export async function searchFoods(query: string): Promise<FoodItem[]> {
  const q = query.trim();
  if (!q) return SAMPLE_FOODS;

  const local = searchSample(q);
  let remote: FoodItem[] = [];

  try {
    remote = await searchOpenFoodFacts(q);
  } catch {
    try {
      remote = await searchViaSearchEngine(q);
    } catch {
      remote = [];
    }
  }

  const merged = [...remote];
  for (const item of local) {
    if (!merged.some((m) => m.name.toLowerCase() === item.name.toLowerCase())) {
      merged.push(item);
    }
  }
  return merged.length ? merged : SAMPLE_FOODS;
}

export async function lookupBarcode(code: string): Promise<FoodItem | null> {
  const cleaned = code.replace(/\D/g, "");
  if (cleaned.length < 8) return null;

  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${cleaned}.json?fields=code,product_name,brands,image_front_small_url,image_url,serving_size,nutriments`,
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { status?: number; product?: OffProduct };
    if (data.status !== 1 || !data.product) return null;
    return mapProduct(data.product, `off-${cleaned}`);
  } catch {
    return null;
  }
}

export async function identifyFromLabel(guess: string): Promise<FoodItem[]> {
  return searchFoods(guess);
}
