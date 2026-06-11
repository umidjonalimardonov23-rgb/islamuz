import { useState, useEffect } from "react";

const DHIKRS = [
  { ar: "سُبْحَانَ اللَّهِ",      uz: "Subhonalloh",      meaning: "Alloh pok",           target: 33  },
  { ar: "الْحَمْدُ لِلَّهِ",       uz: "Alhamdulilloh",    meaning: "Allohga hamd",        target: 33  },
  { ar: "اللَّهُ أَكْبَرُ",        uz: "Allohu Akbar",     meaning: "Alloh ulug'",         target: 34  },
  { ar: "لَا إِلَٰهَ إِلَّا اللَّهُ", uz: "La ilaha illalloh", meaning: "Allohdan boshqa iloh yo'q", target: 100 },
  { ar: "أَسْتَغْفِرُ اللَّهَ",    uz: "Astaghfirulloh",  meaning: "Allohdan kechirim",   target: 100 },
  { ar: "صَلِّ عَلَى النَّبِيِّ",  uz: "Sallohu aleyhi",  meaning: "Payg'ambarga salavot",target: 100 },
];

export default function Tasbih() {
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [flash, setFlash] = useState(false);

  const dhikr = DHIKRS[idx];
  const rounds = Math.floor(count / dhikr.target);
  const cur = count % dhikr.target;
  const pct = Math.min((cur / dhikr.target) * 100, 100);

  useEffect(() => {
    const saved = localStorage.getItem(`tasbih_${idx}`);
    setCount(saved ? Number(saved) : 0);
    const savedTotal = localStorage.getItem("tasbih_total_all");
    setTotal(savedTotal ? Number(savedTotal) : 0);
  }, [idx]);

  const add = (n: number) => {
    const nc = count + n;
    setCount(nc);
    localStorage.setItem(`tasbih_${idx}`, String(nc));
    const nt = total + n;
    setTotal(nt);
    localStorage.setItem("tasbih_total_all", String(nt));
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
  };

  const reset = () => {
    setCount(0);
    localStorage.setItem(`tasbih_${idx}`, "0");
  };

  return (
    <div className="p-4 space-y-3">

      {/* Dhikr selector */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 pt-3 pb-1">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Zikr tanlang</p>
        </div>
        <div className="divide-y divide-border">
          {DHIKRS.map((d, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left tap-active transition-colors ${
                idx === i ? "bg-primary/5" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  idx === i ? "border-primary bg-primary" : "border-muted-foreground/40"
                }`}>
                  {idx === i && <span className="w-2 h-2 rounded-full bg-white block" />}
                </div>
                <div>
                  <div className="arabic text-base text-right" style={{ direction: "rtl" }}>{d.ar}</div>
                  <div className="text-xs text-muted-foreground">{d.uz} • {d.meaning}</div>
                </div>
              </div>
              <div className={`text-xs font-bold ml-2 flex-shrink-0 ${idx === i ? "text-primary" : "text-muted-foreground"}`}>
                ×{d.target}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Counter card */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-r-full"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="p-5 text-center">
          <div className="arabic text-3xl text-primary mb-1">{dhikr.ar}</div>
          <div className="text-sm text-muted-foreground">{dhikr.uz}</div>

          {/* Big tap circle */}
          <button
            onClick={() => add(1)}
            className={`mt-5 w-44 h-44 rounded-full mx-auto flex flex-col items-center justify-center shadow-2xl tap-active transition-all
              ${flash ? "scale-95 shadow-primary/30" : "hover:scale-105"}
              green-gradient text-white`}
          >
            <span className="text-6xl font-bold tabular-nums leading-none">{cur}</span>
            <span className="text-sm opacity-75 mt-1">/ {dhikr.target}</span>
          </button>

          {rounds > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
              🔄 {rounds} marta tugallandi
            </div>
          )}

          <div className="mt-2 text-xs text-muted-foreground">Jami: {count}</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => add(1)}
          className="bg-primary text-white rounded-xl py-3.5 font-bold text-xl tap-active shadow-sm hover:bg-primary/90"
        >
          +1
        </button>
        <button
          onClick={() => add(10)}
          className="bg-primary/10 text-primary rounded-xl py-3.5 font-bold text-xl tap-active hover:bg-primary/20"
        >
          +10
        </button>
        <button
          onClick={reset}
          className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl py-3.5 font-semibold text-sm tap-active hover:bg-red-100"
        >
          🔄 Reset
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white dark:bg-card rounded-xl border border-border p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-primary">{count}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Ushbu zikr</div>
        </div>
        <div className="bg-white dark:bg-card rounded-xl border border-border p-3 text-center shadow-sm">
          <div className="text-2xl font-bold text-primary">{total}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Jami bugun</div>
        </div>
      </div>
    </div>
  );
}
