import { useState } from "react";
import { NAMES_99 } from "@/lib/islamicData";

export default function Names99() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof NAMES_99[0] | null>(null);

  const filtered = NAMES_99.filter(
    (n) =>
      n.uzbek.toLowerCase().includes(search.toLowerCase()) ||
      n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      n.arabic.includes(search)
  );

  if (selected) {
    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-primary font-medium text-sm"
        >
          ← Orqaga
        </button>

        <div className="rounded-2xl islamic-gradient text-white p-8 text-center shadow-lg">
          <div className="text-sm opacity-75 mb-2">#{selected.number}</div>
          <div className="arabic-text text-5xl leading-loose">{selected.arabic}</div>
          <div className="text-xl font-bold mt-4">{selected.transliteration}</div>
          <div className="text-lg opacity-90 mt-1">{selected.uzbek}</div>
        </div>

        <div className="rounded-xl bg-card border border-border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tartib raqami</span>
            <span className="font-semibold">{selected.number} / 99</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Arabcha</span>
            <span className="font-semibold arabic-text text-primary">{selected.arabic}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transkripsiya</span>
            <span className="font-semibold italic">{selected.transliteration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">O'zbek ma'nosi</span>
            <span className="font-semibold">{selected.uzbek}</span>
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
          <p className="arabic-text text-primary text-lg">
            وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            "Allohning eng go'zal ismlari bor, U bilan duo qiling." (Al-A'raf 180)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl islamic-gradient text-white p-4 text-center">
        <div className="arabic-text text-2xl">أَسْمَاءُ اللَّهِ الْحُسْنَى</div>
        <div className="text-sm mt-1 opacity-90">Allohning 99 go'zal ismi</div>
        <div className="text-xs opacity-75 mt-0.5">{NAMES_99.length} ta ism</div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Ism qidiring..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
      />

      {/* Names grid */}
      <div className="grid grid-cols-3 gap-2">
        {filtered.map((name) => (
          <button
            key={name.number}
            onClick={() => setSelected(name)}
            className="rounded-xl bg-card border border-border p-2.5 text-center hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all shadow-sm"
          >
            <div className="text-[10px] text-muted-foreground">{name.number}</div>
            <div className="arabic-text text-sm text-primary mt-0.5 leading-tight">{name.arabic}</div>
            <div className="text-[10px] font-medium text-foreground mt-0.5 truncate">{name.uzbek}</div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-3xl mb-2">🔍</div>
          <div className="text-sm">"{search}" topilmadi</div>
        </div>
      )}
    </div>
  );
}
