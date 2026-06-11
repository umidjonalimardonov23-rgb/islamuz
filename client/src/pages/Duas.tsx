import { useState } from "react";
import { DUAS } from "@/lib/islamicData";

export default function Duas() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  const cat = DUAS[activeCategory];

  return (
    <div className="p-4 space-y-4">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {DUAS.map((c, i) => (
          <button
            key={i}
            onClick={() => { setActiveCategory(i); setExpanded(null); }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === i
                ? "bg-primary text-white shadow-sm"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.category}</span>
          </button>
        ))}
      </div>

      {/* Duas list */}
      <div className="space-y-3">
        {cat.items.map((dua, i) => (
          <div
            key={i}
            className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full islamic-gradient flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <span className="font-semibold text-sm text-foreground">{dua.title}</span>
              </div>
              <span className={`text-primary transition-transform ${expanded === i ? "rotate-180" : ""}`}>▼</span>
            </button>

            {expanded === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                {/* Arabic */}
                <div className="bg-primary/5 rounded-xl p-3 mt-3">
                  <p className="arabic-text text-right text-lg text-primary leading-loose">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Transkripsiya</div>
                  <p className="text-sm italic text-foreground/80">{dua.transliteration}</p>
                </div>

                {/* Uzbek meaning */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ma'nosi (O'zbek)</div>
                  <p className="text-sm text-foreground">{dua.uzbek}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
