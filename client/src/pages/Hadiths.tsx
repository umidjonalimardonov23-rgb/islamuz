import { useState } from "react";
import { HADITHS } from "@/lib/islamicData";

const CATEGORIES = ["Barchasi", "Axloq", "Ilm", "Amal", "Oila", "Rahm", "Hikmat", "Hayot"];

export default function Hadiths() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeCategory === "Barchasi"
    ? HADITHS
    : HADITHS.filter(h => h.category === activeCategory);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl islamic-gradient text-white p-4 text-center shadow-md">
        <div className="arabic-text text-2xl">الأَحَادِيثُ النَّبَوِيَّةُ</div>
        <div className="text-sm mt-1 opacity-90">Payg'ambar (s.a.v.) hadislari</div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpanded(null); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hadith list */}
      <div className="space-y-3">
        {filtered.map((hadith, i) => (
          <div
            key={hadith.id}
            className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">{hadith.id}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground line-clamp-2">{hadith.text}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {hadith.source}
                    </span>
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {hadith.category}
                    </span>
                  </div>
                </div>
                <span className={`text-primary flex-shrink-0 transition-transform mt-1 ${expanded === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </div>
            </button>

            {expanded === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                {/* Arabic */}
                <div className="bg-primary/5 rounded-xl p-3 mt-3">
                  <p className="arabic-text text-right text-base text-primary leading-loose">
                    {hadith.arabic}
                  </p>
                </div>

                {/* Full text */}
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tarjima</div>
                  <p className="text-sm text-foreground">{hadith.text}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Manba:</span>
                  <span className="text-xs font-semibold text-primary">{hadith.source}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-sm">Bu toifada hadis yo'q</div>
        </div>
      )}
    </div>
  );
}
