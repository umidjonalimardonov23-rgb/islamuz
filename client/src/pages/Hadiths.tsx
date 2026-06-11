import { useState } from "react";
import { HADITHS } from "@/lib/islamicData";

const CATS = ["Barchasi", "Axloq", "Ilm", "Amal", "Oila", "Rahm", "Hikmat", "Hayot"];

export default function Hadiths() {
  const [cat, setCat] = useState("Barchasi");
  const [openId, setOpenId] = useState<number | null>(null);

  const list = cat === "Barchasi" ? HADITHS : HADITHS.filter(h => h.category === cat);

  return (
    <div className="p-4 space-y-3">

      {/* Header */}
      <div className="green-gradient text-white rounded-2xl p-4 text-center shadow-md">
        <p className="arabic text-2xl">الأَحَادِيثُ النَّبَوِيَّةُ</p>
        <p className="text-sm mt-1 opacity-90 font-semibold">Payg'ambar (s.a.v.) hadislari</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => { setCat(c); setOpenId(null); }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tap-active transition-all ${
              cat === c
                ? "bg-primary text-white shadow-sm"
                : "bg-white dark:bg-card border border-border text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Hadith list */}
      <div className="space-y-2">
        {list.map(h => (
          <div key={h.id} className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenId(openId === h.id ? null : h.id)}
              className="w-full px-4 py-3.5 text-left hover:bg-muted/30 tap-active transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-bold">{h.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug line-clamp-2">{h.text}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">{h.source}</span>
                    <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{h.category}</span>
                  </div>
                </div>
                <span className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 mt-1 ${openId === h.id ? "rotate-180" : ""}`}>▾</span>
              </div>
            </button>

            {openId === h.id && (
              <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                <div className="bg-primary/5 rounded-xl p-4">
                  <p className="arabic text-right text-lg text-primary leading-loose">{h.arabic}</p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{h.text}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Manba:</span>
                  <span className="text-xs font-bold text-primary">{h.source}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-sm">Bu toifada hadis yo'q</p>
        </div>
      )}
    </div>
  );
}
