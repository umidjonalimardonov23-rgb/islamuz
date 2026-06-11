import { useState } from "react";
import { NAMES_99 } from "@/lib/islamicData";

export default function Names99() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof NAMES_99[0] | null>(null);

  const filtered = search.trim()
    ? NAMES_99.filter(n =>
        n.uzbek.toLowerCase().includes(search.toLowerCase()) ||
        n.transliteration.toLowerCase().includes(search.toLowerCase())
      )
    : NAMES_99;

  if (selected) {
    const prev = NAMES_99[selected.number - 2];
    const next = NAMES_99[selected.number];
    return (
      <div className="p-4 space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-primary font-medium text-sm tap-active">
          ‹ Barcha ismlar
        </button>

        {/* Big Arabic display */}
        <div className="green-gradient text-white rounded-3xl p-8 text-center shadow-lg">
          <div className="text-sm opacity-70 mb-2">#{selected.number} / 99</div>
          <div className="arabic text-6xl text-white leading-loose my-2">{selected.arabic}</div>
          <div className="text-2xl font-bold mt-2">{selected.transliteration}</div>
          <div className="text-lg opacity-90 mt-1">{selected.uzbek}</div>
        </div>

        {/* Quran verse */}
        <div className="bg-white dark:bg-card rounded-2xl border border-border p-4 text-center shadow-sm">
          <p className="arabic text-xl text-primary">وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا</p>
          <p className="text-xs text-muted-foreground mt-2">"Allohning eng go'zal ismlari bor, U bilan duo qiling." — Al-A'raf 180</p>
        </div>

        {/* Prev/Next navigation */}
        <div className="flex gap-2">
          {prev && (
            <button
              onClick={() => setSelected(prev)}
              className="flex-1 bg-white dark:bg-card border border-border rounded-xl p-3 text-left tap-active hover:border-primary/40 transition-colors"
            >
              <div className="text-xs text-muted-foreground">‹ Oldingi</div>
              <div className="arabic text-base text-primary mt-0.5">{prev.arabic}</div>
              <div className="text-xs text-foreground">{prev.uzbek}</div>
            </button>
          )}
          {next && (
            <button
              onClick={() => setSelected(next)}
              className="flex-1 bg-white dark:bg-card border border-border rounded-xl p-3 text-right tap-active hover:border-primary/40 transition-colors"
            >
              <div className="text-xs text-muted-foreground">Keyingi ›</div>
              <div className="arabic text-base text-primary mt-0.5">{next.arabic}</div>
              <div className="text-xs text-foreground">{next.uzbek}</div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="green-gradient text-white rounded-2xl p-4 text-center shadow-md">
        <p className="arabic text-2xl">أَسْمَاءُ اللَّهِ الْحُسْنَى</p>
        <p className="text-sm mt-1 opacity-90 font-semibold">Allohning 99 Go'zal Ismi</p>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
        <input
          type="text"
          placeholder="Ism qidiring..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2">
        {filtered.map(name => (
          <button
            key={name.number}
            onClick={() => setSelected(name)}
            className="bg-white dark:bg-card border border-border rounded-xl p-2.5 text-center tap-active hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm"
          >
            <div className="text-[10px] text-muted-foreground font-medium">{name.number}</div>
            <div className="arabic text-lg text-primary my-0.5 leading-tight">{name.arabic}</div>
            <div className="text-[10px] font-semibold text-foreground leading-tight line-clamp-1">{name.uzbek}</div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-sm">"{search}" topilmadi</p>
        </div>
      )}
    </div>
  );
}
