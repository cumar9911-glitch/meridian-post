import { useEffect, useState } from "react";
import { BodyScanner } from "./components/BodyScanner";
import { Dashboard } from "./components/Dashboard";
import { FoodScanner } from "./components/FoodScanner";
import { loadState } from "./lib/storage";
import type { AppState, View } from "./lib/types";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 18c3.5-8 5.5-12 7-12s3.5 4 7 12"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="12" cy="7" r="1.8" fill="currentColor" />
      </svg>
    </span>
  );
}

function Home({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <section className="hero" aria-label="Forma home">
      <div className="hero-media" />
      <div className="hero-scan" />
      <div className="hero-copy">
        <h1 className="hero-brand">Forma</h1>
        <p className="hero-tagline">See your body. Know your food.</p>
        <p className="hero-support">
          Body composition targets for weight loss or gain, plus a food scanner
          for calories, fat, and sugar — so every plate has a plan.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate("body")}>
            Open body scanner
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onNavigate("food")}>
            Scan a meal
          </button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    setState(loadState());
  }, [view]);

  return (
    <div className="app-shell">
      <header className="topnav">
        <button type="button" className="brand" onClick={() => setView("home")}>
          <BrandMark />
          Forma
        </button>
        <nav className="nav-links" aria-label="Primary">
          {(
            [
              ["home", "Home"],
              ["body", "Body"],
              ["food", "Food"],
              ["dashboard", "Today"],
            ] as [View, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={view === id ? "active" : ""}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className={view === "home" ? "main main-home" : "main"}>
        {view === "home" && <Home onNavigate={setView} />}
        {view === "body" && <BodyScanner state={state} onUpdate={setState} />}
        {view === "food" && <FoodScanner state={state} onUpdate={setState} />}
        {view === "dashboard" && (
          <Dashboard
            state={state}
            onUpdate={setState}
            onNavigate={(v) => setView(v)}
          />
        )}
      </main>
    </div>
  );
}
