import { useState } from "react";
import { DUAS } from "@/lib/islamicData";

export default function Duas() {
  const [catIdx, setCatIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const cat = DUAS[catIdx];

  return (
    <div className="p-4 space-y-3">

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {DUAS.map((c, i) => (
          <button
            key={i}
            onClick={() => { setCatIdx(i); setOpenIdx(null); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium tap-active transition-all ${
              catIdx === i
                ? "bg-primary text-white shadow-sm"
                : "bg-white dark:bg-card border border-border text-foreground"
            }`}
          >
            <span>{c.icon}</span> {c.category}
          </button>
        ))}
      </div>

      {/* Duas */}
      <div className="space-y-2">
        {cat.items.map((dua, i) => (
          <div key={i} className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 tap-active transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">{i + 1}</span>
              </div>
              <span className="flex-1 font-semibold text-sm text-foreground">{dua.title}</span>
              <span className={`text-muted-foreground text-sm transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>

            {openIdx === i && (
              <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                {/* Arabic text */}
                <div className="bg-primary/5 rounded-xl p-4">
                  <p className="arabic text-right text-xl text-primary leading-loose">
                    {dua.arabic}
                  </p>
                </div>

                {/* Uzbek */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Ma'nosi</p>
                  <p className="text-sm text-foreground leading-relaxed">{dua.uzbek}</p>
                </div>

                {/* Transliteration */}
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Transkripsiya</p>
                  <p className="text-xs italic text-foreground/80 leading-relaxed">{dua.transliteration}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
