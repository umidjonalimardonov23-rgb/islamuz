import { useState, useEffect } from "react";

const TASBIH_OPTIONS = [
  { label: "سُبْحَانَ اللَّهِ", uzbek: "Subhanalloh", target: 33 },
  { label: "الْحَمْدُ لِلَّهِ", uzbek: "Alhamdulilloh", target: 33 },
  { label: "اللَّهُ أَكْبَرُ", uzbek: "Allohu Akbar", target: 34 },
  { label: "لَا إِلَهَ إِلَّا اللَّهُ", uzbek: "La ilaha illalloh", target: 100 },
  { label: "أَسْتَغْفِرُ اللَّهَ", uzbek: "Astaghfirulloh", target: 100 },
];

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [total, setTotal] = useState(0);

  const selected = TASBIH_OPTIONS[selectedIdx];
  const progress = Math.min((count / selected.target) * 100, 100);
  const completed = Math.floor(count / selected.target);
  const remaining = count % selected.target;

  useEffect(() => {
    const saved = localStorage.getItem("tasbih_count");
    if (saved) setCount(Number(saved));
    const savedTotal = localStorage.getItem("tasbih_total");
    if (savedTotal) setTotal(Number(savedTotal));
  }, []);

  const addCount = (n: number) => {
    const newCount = count + n;
    setCount(newCount);
    setTotal(t => {
      const newTotal = t + n;
      localStorage.setItem("tasbih_total", String(newTotal));
      return newTotal;
    });
    localStorage.setItem("tasbih_count", String(newCount));
    setPulse(true);
    setTimeout(() => setPulse(false), 150);
  };

  const reset = () => {
    setCount(0);
    localStorage.setItem("tasbih_count", "0");
  };

  return (
    <div className="p-4 space-y-4">
      {/* Selector */}
      <div className="grid grid-cols-1 gap-2">
        {TASBIH_OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelectedIdx(i); setCount(0); }}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all ${
              selectedIdx === i
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-card border-border text-foreground hover:border-primary/50"
            }`}
          >
            <span className={`arabic-text text-base ${selectedIdx === i ? "text-white" : "text-primary"}`}>
              {opt.label}
            </span>
            <div className="text-right">
              <div className={`text-xs font-medium ${selectedIdx === i ? "text-white/90" : "text-muted-foreground"}`}>
                {opt.uzbek}
              </div>
              <div className={`text-xs ${selectedIdx === i ? "text-white/70" : "text-muted-foreground"}`}>
                Maqsad: {opt.target}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main counter */}
      <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-muted">
          <div
            className="h-full islamic-gradient transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6 text-center">
          <div className="arabic-text text-2xl text-primary mb-1">{selected.label}</div>
          <div className="text-sm text-muted-foreground mb-4">{selected.uzbek}</div>

          {/* Big count button */}
          <button
            onClick={() => addCount(1)}
            className={`tasbih-button w-48 h-48 rounded-full islamic-gradient text-white shadow-2xl flex flex-col items-center justify-center mx-auto transition-all ${
              pulse ? "scale-95 shadow-lg" : "hover:scale-105"
            }`}
          >
            <span className="text-6xl font-bold tabular-nums">{remaining || count}</span>
            <span className="text-sm opacity-80 mt-1">bosing</span>
          </button>

          {/* Completed rounds */}
          {completed > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              🔄 {completed} marta tugallandi ({count} jami)
            </div>
          )}

          {/* Progress text */}
          <div className="mt-2 text-xs text-muted-foreground">
            {remaining} / {selected.target} • Jami bugun: {total}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => addCount(1)}
          className="bg-primary/10 hover:bg-primary/20 text-primary rounded-xl py-3 font-semibold text-lg transition-colors"
        >
          +1
        </button>
        <button
          onClick={() => addCount(10)}
          className="bg-primary/10 hover:bg-primary/20 text-primary rounded-xl py-3 font-semibold text-lg transition-colors"
        >
          +10
        </button>
        <button
          onClick={reset}
          className="bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-xl py-3 font-semibold text-sm transition-colors"
        >
          🔄 Reset
        </button>
      </div>

      {/* Total stats */}
      <div className="rounded-xl bg-muted p-4 text-center">
        <div className="text-xs text-muted-foreground">Bugungi jami tasbih</div>
        <div className="text-2xl font-bold text-primary mt-1">{total}</div>
      </div>
    </div>
  );
}
