import { useEffect, useRef, useState } from "react";
import {
  ACTIVITY_OPTIONS,
  bmi,
  bmiLabel,
  bmr,
  bodyFatPct,
  goalCopy,
  targetCalories,
  tdee,
} from "../lib/calculations";
import { addBodyScan, saveProfile } from "../lib/storage";
import type { AppState, Goal, Profile, Sex } from "../lib/types";

interface Props {
  state: AppState;
  onUpdate: (s: AppState) => void;
}

const defaultProfile = (existing: Profile | null): Profile =>
  existing ?? {
    name: "",
    age: 30,
    sex: "female",
    heightCm: 168,
    weightKg: 68,
    neckCm: 34,
    waistCm: 78,
    hipCm: 98,
    goal: "lose",
    activity: 1.375,
  };

export function BodyScanner({ state, onUpdate }: Props) {
  const [profile, setProfile] = useState<Profile>(() => defaultProfile(state.profile));
  const [scanning, setScanning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  async function startCamera() {
    setCamError(null);
    setSnapshot(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setCamError("Camera unavailable — enter measurements manually to continue.");
      setCameraOn(false);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }

  function captureFrame() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setSnapshot(canvas.toDataURL("image/jpeg", 0.85));
    stopCamera();
  }

  async function runScan() {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 1100));

    const bmiValue = bmi(profile.weightKg, profile.heightCm);
    const bmrValue = bmr(profile.weightKg, profile.heightCm, profile.age, profile.sex);
    const tdeeValue = tdee(bmrValue, profile.activity);
    const target = targetCalories(tdeeValue, profile.goal);
    const fat = bodyFatPct(profile);

    const nextProfile = { ...profile };
    const withProfile = saveProfile(nextProfile);
    const scan = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      weightKg: profile.weightKg,
      bmi: Math.round(bmiValue * 10) / 10,
      bmr: Math.round(bmrValue),
      tdee: Math.round(tdeeValue),
      targetCalories: target,
      bodyFatPct: fat === null ? null : Math.round(fat * 10) / 10,
      goal: profile.goal,
    };
    const next = addBodyScan(scan);
    onUpdate({ ...withProfile, ...next, profile: nextProfile });
    setScanning(false);
  }

  const latest = state.bodyScans[0];
  const copy = goalCopy(profile.goal);

  function setField<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  return (
    <section className="section">
      <div className="section-head">
        <h2>Body scanner</h2>
        <p>
          Capture a frame for your log, then enter height, weight, and optional
          circumference measures for BMI, metabolism, and Navy body-fat estimates.
        </p>
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3>Scan stage</h3>
          <div className="scanner-stage">
            {snapshot ? (
              <img className="capture" src={snapshot} alt="Body scan capture" />
            ) : (
              <video ref={videoRef} playsInline muted />
            )}
            {(cameraOn || scanning) && <div className="scanner-overlay" />}
          </div>
          <div className="scanner-actions">
            {!cameraOn ? (
              <button type="button" className="btn btn-solid" onClick={startCamera}>
                Open camera
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={captureFrame}>
                Capture frame
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
          {camError && <p className="status error">{camError}</p>}
          <p className="hint">
            Visual capture is for your personal progress journal. Composition
            numbers come from the measurements below — not from photo AI.
          </p>
        </div>

        <div className="panel">
          <h3>Measurements</h3>
          <div className="form-grid">
            <label className="full">
              Name
              <input
                value={profile.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Age
              <input
                type="number"
                min={14}
                max={90}
                value={profile.age}
                onChange={(e) => setField("age", Number(e.target.value))}
              />
            </label>
            <label>
              Sex
              <select
                value={profile.sex}
                onChange={(e) => setField("sex", e.target.value as Sex)}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
            <label>
              Height (cm)
              <input
                type="number"
                min={120}
                max={230}
                value={profile.heightCm}
                onChange={(e) => setField("heightCm", Number(e.target.value))}
              />
            </label>
            <label>
              Weight (kg)
              <input
                type="number"
                min={35}
                max={250}
                step={0.1}
                value={profile.weightKg}
                onChange={(e) => setField("weightKg", Number(e.target.value))}
              />
            </label>
            <label>
              Neck (cm)
              <input
                type="number"
                min={20}
                max={60}
                step={0.1}
                value={profile.neckCm ?? ""}
                onChange={(e) =>
                  setField("neckCm", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </label>
            <label>
              Waist (cm)
              <input
                type="number"
                min={40}
                max={200}
                step={0.1}
                value={profile.waistCm ?? ""}
                onChange={(e) =>
                  setField("waistCm", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </label>
            <label>
              Hips (cm)
              <input
                type="number"
                min={40}
                max={200}
                step={0.1}
                value={profile.hipCm ?? ""}
                onChange={(e) =>
                  setField("hipCm", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </label>
            <label className="full">
              Activity
              <select
                value={profile.activity}
                onChange={(e) => setField("activity", Number(e.target.value))}
              >
                {ACTIVITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.hint}
                  </option>
                ))}
              </select>
            </label>
            <div className="full">
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink-soft)" }}>
                Goal
              </span>
              <div className="segmented" style={{ marginTop: "0.35rem" }}>
                {(
                  [
                    ["lose", "Lose"],
                    ["maintain", "Maintain"],
                    ["gain", "Gain"],
                  ] as [Goal, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={profile.goal === value ? "active" : ""}
                    onClick={() => setField("goal", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="scanner-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void runScan()}
              disabled={scanning}
            >
              {scanning ? "Analyzing…" : "Run body analysis"}
            </button>
          </div>
        </div>
      </div>

      {latest && (
        <div className="panel" style={{ marginTop: "1rem" }}>
          <h3>Latest analysis</h3>
          <div className="metrics">
            <div className="metric">
              <span>BMI</span>
              <strong>{latest.bmi}</strong>
              <em>{bmiLabel(latest.bmi)}</em>
            </div>
            <div className="metric">
              <span>Body fat</span>
              <strong>{latest.bodyFatPct != null ? `${latest.bodyFatPct}%` : "—"}</strong>
              <em>{latest.bodyFatPct != null ? "Navy estimate" : "Add neck/waist/hips"}</em>
            </div>
            <div className="metric">
              <span>BMR</span>
              <strong>{latest.bmr}</strong>
              <em>kcal / day at rest</em>
            </div>
            <div className="metric">
              <span>Target intake</span>
              <strong>{latest.targetCalories}</strong>
              <em>for {latest.goal}</em>
            </div>
          </div>
          <p className="result-note">
            <strong>{copy.title}.</strong> {copy.blurb} Estimated burn at your activity
            level is about {latest.tdee} kcal/day.
          </p>
        </div>
      )}
    </section>
  );
}
