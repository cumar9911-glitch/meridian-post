import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { lookupBarcode, sampleFoods, searchFoods } from "../lib/foodApi";
import { addFoodLog } from "../lib/storage";
import type { AppState, FoodItem, FoodLogEntry } from "../lib/types";

interface Props {
  state: AppState;
  onUpdate: (s: AppState) => void;
}

type Meal = FoodLogEntry["meal"];

export function FoodScanner({ onUpdate }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>(() => sampleFoods());
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meal, setMeal] = useState<Meal>("lunch");
  const [servings, setServings] = useState(1);
  const [barcode, setBarcode] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => () => stopCamera(), []);

  async function startCamera() {
    setError(null);
    setSnapshot(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
      setStatus("Point at a meal or package, then capture.");
    } catch {
      setError("Camera blocked — search by name or enter a barcode instead.");
      setCameraOn(false);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }

  function captureAndSuggest() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setSnapshot(canvas.toDataURL("image/jpeg", 0.85));
    stopCamera();
    setResults(sampleFoods());
    setSelected(null);
    setStatus(
      "Photo saved to this session. Type the food name or barcode below to pull calories, fat, and sugar.",
    );
  }

  async function doSearch(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setStatus("Searching Open Food Facts + Forma samples…");
    try {
      const found = await searchFoods(query);
      setResults(found);
      setSelected(found[0] ?? null);
      setStatus(found.length ? `${found.length} matches` : "No matches");
    } catch {
      setError("Search failed. Try again or use sample foods.");
    } finally {
      setLoading(false);
    }
  }

  async function doBarcode(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setStatus("Looking up barcode…");
    const item = await lookupBarcode(barcode);
    if (!item) {
      setError("Product not found. Try another barcode or search by name.");
      setStatus(null);
    } else {
      setResults([item, ...results.filter((r) => r.id !== item.id)]);
      setSelected(item);
      setStatus(`Found ${item.name}`);
    }
    setLoading(false);
  }

  function logFood() {
    if (!selected) return;
    const entry: FoodLogEntry = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      meal,
      food: selected,
      servings,
    };
    onUpdate(addFoodLog(entry));
    setStatus(`Logged ${selected.name} to ${meal}.`);
  }

  const macros = useMemo(() => {
    if (!selected) return null;
    return {
      calories: Math.round(selected.calories * servings),
      fat: Math.round(selected.fat * servings * 10) / 10,
      sugar: Math.round(selected.sugar * servings * 10) / 10,
      protein: Math.round(selected.protein * servings * 10) / 10,
      carbs: Math.round(selected.carbs * servings * 10) / 10,
    };
  }, [selected, servings]);

  return (
    <section className="section">
      <div className="section-head">
        <h2>Food scanner</h2>
        <p>
          Scan a meal with your camera, search by name, or look up a barcode for
          calories, fat, and sugar — then log it to your day.
        </p>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Camera / barcode</h3>
          <div className="scanner-stage">
            {snapshot ? (
              <img className="capture" src={snapshot} alt="Food capture" />
            ) : (
              <video ref={videoRef} playsInline muted />
            )}
            {(cameraOn || loading) && <div className="scanner-overlay" />}
          </div>
          <div className="scanner-actions">
            {!cameraOn ? (
              <button type="button" className="btn btn-solid" onClick={() => void startCamera()}>
                Open food camera
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={captureAndSuggest}>
                Capture plate
              </button>
            )}
            {snapshot && (
              <button
                type="button"
                className="btn btn-ghost dark"
                onClick={() => {
                  setSnapshot(null);
                  void startCamera();
                }}
              >
                Retake
              </button>
            )}
          </div>

          <form className="search-row" onSubmit={(e) => void doBarcode(e)} style={{ marginTop: "1rem" }}>
            <input
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Barcode (EAN / UPC)"
              inputMode="numeric"
            />
            <button type="submit" className="btn btn-solid" disabled={loading}>
              Lookup
            </button>
          </form>
          <p className="hint">
            Live nutrition data from Open Food Facts when online. Sample catalog
            always available offline.
          </p>
        </div>

        <div className="panel">
          <h3>Find food</h3>
          <form className="search-row" onSubmit={(e) => void doSearch(e)}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. Greek yogurt, oats…"
            />
            <button type="submit" className="btn btn-solid" disabled={loading}>
              Search
            </button>
          </form>
          {status && <p className="status">{status}</p>}
          {error && <p className="status error">{error}</p>}

          <div className="food-list">
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`food-item${selected?.id === item.id ? " selected" : ""}`}
                onClick={() => setSelected(item)}
              >
                {item.imageUrl ? (
                  <img className="food-thumb" src={item.imageUrl} alt="" />
                ) : (
                  <div className="food-thumb placeholder">
                    {item.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="food-meta">
                  <strong>{item.name}</strong>
                  <span>
                    {item.brand ? `${item.brand} · ` : ""}
                    {item.serving}
                  </span>
                </div>
                <div className="food-cals">{item.calories} kcal</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && macros && (
        <div className="panel" style={{ marginTop: "1rem" }}>
          <h3>{selected.name}</h3>
          <div className="macro-pills">
            <span>
              Calories <b>{macros.calories}</b>
            </span>
            <span>
              Fat <b>{macros.fat} g</b>
            </span>
            <span>
              Sugar <b>{macros.sugar} g</b>
            </span>
            <span>
              Carbs <b>{macros.carbs} g</b>
            </span>
            <span>
              Protein <b>{macros.protein} g</b>
            </span>
          </div>
          <div className="form-grid">
            <label>
              Meal
              <select value={meal} onChange={(e) => setMeal(e.target.value as Meal)}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </label>
            <label>
              Servings
              <input
                type="number"
                min={0.25}
                max={10}
                step={0.25}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="scanner-actions">
            <button type="button" className="btn btn-primary" onClick={logFood}>
              Log to today
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
