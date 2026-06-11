import { useState } from "react";
import { ISLAMIC_TOPICS } from "@/lib/islamicData";

export default function IslamicTopics() {
  const [selected, setSelected] = useState<typeof ISLAMIC_TOPICS[0] | null>(null);

  if (selected) {
    return (
      <div className="p-4 space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-primary font-medium text-sm"
        >
          ← Orqaga
        </button>

        <div
          className="rounded-2xl text-white p-6 text-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)` }}
        >
          <div className="text-5xl mb-2">{selected.icon}</div>
          <div className="text-2xl font-bold">{selected.title}</div>
          <div className="text-sm opacity-90 mt-1">{selected.subtitle}</div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4 shadow-sm">
          <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line text-sm leading-relaxed">
            {selected.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl islamic-gradient text-white p-4 text-center shadow-md">
        <div className="text-3xl mb-1">🕋</div>
        <div className="text-lg font-bold">Islomiy Mavzular</div>
        <div className="text-xs opacity-80 mt-0.5">Islomning besh ustuni va asosiy aqidalar</div>
      </div>

      {/* Topics list */}
      <div className="space-y-3">
        {ISLAMIC_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelected(topic)}
            className="w-full rounded-2xl bg-card border border-border shadow-sm p-4 flex items-center gap-4 hover:border-primary/50 hover:bg-muted/30 active:scale-[0.98] transition-all text-left"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
              style={{ background: `${topic.color}20`, border: `2px solid ${topic.color}40` }}
            >
              {topic.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">{topic.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{topic.subtitle}</div>
            </div>
            <span className="text-primary text-lg">›</span>
          </button>
        ))}
      </div>

      {/* Note */}
      <div className="rounded-xl bg-muted p-3 text-center text-xs text-muted-foreground">
        📖 Bilim olish har bir musulmonning burchidir
      </div>
    </div>
  );
}
