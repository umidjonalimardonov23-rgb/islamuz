import { useState } from "react";
import { ISLAMIC_TOPICS } from "@/lib/islamicData";

export default function IslamicTopics() {
  const [selected, setSelected] = useState<typeof ISLAMIC_TOPICS[0] | null>(null);

  if (selected) {
    return (
      <div className="p-4 space-y-4">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-primary font-medium text-sm tap-active">
          ‹ Mavzular
        </button>

        <div
          className="rounded-3xl text-white p-6 text-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${selected.color}dd, ${selected.color})` }}
        >
          <div className="text-6xl mb-3">{selected.icon}</div>
          <div className="text-2xl font-bold">{selected.title}</div>
          <div className="text-sm opacity-80 mt-1">{selected.subtitle}</div>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">{selected.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="green-gradient text-white rounded-2xl p-4 text-center shadow-md">
        <div className="text-3xl mb-1">🕋</div>
        <div className="text-base font-bold">Islomiy Mavzular</div>
        <div className="text-xs opacity-80 mt-0.5">Islomning besh ustuni va asosiy aqidalar</div>
      </div>

      <div className="space-y-2">
        {ISLAMIC_TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelected(topic)}
            className="w-full bg-white dark:bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4 text-left tap-active card-hover"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${topic.color}18` }}
            >
              {topic.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground">{topic.title}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{topic.subtitle}</div>
            </div>
            <span className="text-muted-foreground text-xl">›</span>
          </button>
        ))}
      </div>

      {/* More section - Hadiths link */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4 opacity-80">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-3xl flex-shrink-0">
          📚
        </div>
        <div className="flex-1">
          <div className="font-bold text-foreground">Hadislar</div>
          <div className="text-sm text-muted-foreground mt-0.5">Quyidagi Hadislar bo'limida</div>
        </div>
      </div>

      <div className="rounded-xl bg-muted p-3 text-center text-xs text-muted-foreground">
        📖 Ilm o'rganish har bir musulmonga farzdir
      </div>
    </div>
  );
}
