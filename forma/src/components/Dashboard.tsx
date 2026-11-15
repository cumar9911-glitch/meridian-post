import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { isSameDay, removeFoodLog, todayKey } from "../lib/storage";
import type { AppState } from "../lib/types";

interface Props {
  state: AppState;
  onUpdate: (s: AppState) => void;
  onNavigate: (view: "body" | "food") => void;
}

export function Dashboard({ state, onUpdate, onNavigate }: Props) {
  const today = todayKey();
  const todaysFood = state.foodLog.filter((e) => isSameDay(e.at, today));
  const target = state.bodyScans[0]?.targetCalories ?? 2000;

  const totals = todaysFood.reduce(
    (acc, e) => {
      acc.calories += e.food.calories * e.servings;
      acc.fat += e.food.fat * e.servings;
      acc.sugar += e.food.sugar * e.servings;
      acc.protein += e.food.protein * e.servings;
      return acc;
    },
    { calories: 0, fat: 0, sugar: 0, protein: 0 },
  );

  const chartData = [...state.bodyScans]
    .slice()
    .reverse()
    .map((s) => ({
      date: new Date(s.at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      weight: s.weightKg,
      bmi: s.bmi,
    }));

  const remaining = Math.round(target - totals.calories);
  const goal = state.profile?.goal ?? state.bodyScans[0]?.goal ?? "maintain";

  return (
    <section className="section">
      <div className="section-head">
        <h2>Today</h2>
        <p>
          {state.profile?.name
            ? `Hi ${state.profile.name} — `
            : ""}
          track intake against your {goal} target and watch weight trend over time.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h3>Daily nutrition</h3>
          <div className="day-totals">
            <div className="metric">
              <span>Calories</span>
              <strong>{Math.round(totals.calories)}</strong>
              <em>of {target} target</em>
            </div>
            <div className="metric">
              <span>Remaining</span>
              <strong>{remaining}</strong>
              <em>{remaining >= 0 ? "kcal left" : "over target"}</em>
            </div>
            <div className="metric">
              <span>Fat</span>
              <strong>{Math.round(totals.fat * 10) / 10}g</strong>
              <em>logged today</em>
            </div>
            <div className="metric">
              <span>Sugar</span>
              <strong>{Math.round(totals.sugar * 10) / 10}g</strong>
              <em>logged today</em>
            </div>
          </div>

          {todaysFood.length === 0 ? (
            <div className="empty">
              No foods logged yet.
              <div className="cta-row" style={{ justifyContent: "center", marginTop: "0.85rem" }}>
                <button type="button" className="btn btn-solid" onClick={() => onNavigate("food")}>
                  Scan food
                </button>
              </div>
            </div>
          ) : (
            <div className="log-list">
              {todaysFood.map((entry) => (
                <div key={entry.id} className="log-row">
                  <div>
                    <strong>{entry.food.name}</strong>
                    <div className="hint" style={{ margin: 0 }}>
                      {entry.meal} · {entry.servings}× ·{" "}
                      {Math.round(entry.food.calories * entry.servings)} kcal · fat{" "}
                      {Math.round(entry.food.fat * entry.servings * 10) / 10}g · sugar{" "}
                      {Math.round(entry.food.sugar * entry.servings * 10) / 10}g
                    </div>
                  </div>
                  <button
                    type="button"
                    className="icon"
                    aria-label="Remove"
                    onClick={() => onUpdate(removeFoodLog(entry.id))}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h3>Weight trend</h3>
          {chartData.length < 2 ? (
            <div className="empty">
              Run at least two body scans to see your weight curve.
              <div className="cta-row" style={{ justifyContent: "center", marginTop: "0.85rem" }}>
                <button type="button" className="btn btn-solid" onClick={() => onNavigate("body")}>
                  Body scanner
                </button>
              </div>
            </div>
          ) : (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(16,34,31,0.08)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#3d524d", fontSize: 12 }} />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fill: "#3d524d", fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgba(16,34,31,0.1)",
                      background: "#fffdf8",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    name="Weight (kg)"
                    stroke="#0b3d38"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#b8f26e", stroke: "#0b3d38", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {state.bodyScans[0] && (
            <p className="result-note" style={{ marginTop: "0.85rem" }}>
              Latest: {state.bodyScans[0].weightKg} kg · BMI {state.bodyScans[0].bmi}
              {state.bodyScans[0].bodyFatPct != null
                ? ` · ${state.bodyScans[0].bodyFatPct}% body fat`
                : ""}
            </p>
          )}
        </div>
      </div>

      <p className="footer-note">
        Forma is a wellness planning tool, not medical advice. Talk to a clinician
        before major diet or training changes.
      </p>
    </section>
  );
}
