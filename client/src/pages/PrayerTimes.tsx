import { useState, useEffect } from "react";
import { PRAYER_TIMES_TASHKENT, PRAYER_NAMES } from "@/lib/islamicData";

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(m: number) {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export default function PrayerTimes() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const times = PRAYER_TIMES_TASHKENT[month];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const prayers = [
    { key: "fajr",    time: times.fajr },
    { key: "sunrise", time: times.sunrise },
    { key: "dhuhr",   time: times.dhuhr },
    { key: "asr",     time: times.asr },
    { key: "maghrib", time: times.maghrib },
    { key: "isha",    time: times.isha },
  ] as const;

  // Find current and next prayer
  let currentPrayer = prayers[prayers.length - 1].key;
  let nextPrayer = prayers[0].key;
  let nextMinutes = timeToMinutes(prayers[0].time);

  for (let i = 0; i < prayers.length; i++) {
    const pMin = timeToMinutes(prayers[i].time);
    if (currentMinutes >= pMin) {
      currentPrayer = prayers[i].key;
      const nextIdx = (i + 1) % prayers.length;
      nextPrayer = prayers[nextIdx].key;
      nextMinutes = timeToMinutes(prayers[nextIdx].time);
    }
  }

  const diffMin = nextMinutes - currentMinutes;
  const remaining = diffMin >= 0 ? diffMin : diffMin + 1440;
  const remainHours = Math.floor(remaining / 60);
  const remainMins = remaining % 60;

  const weekDays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
  const dateStr = `${weekDays[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className="p-4 space-y-4">
      {/* Date card */}
      <div className="rounded-2xl islamic-gradient text-white p-5 text-center shadow-md">
        <div className="text-sm opacity-80">📍 Toshkent shahri</div>
        <div className="text-lg font-semibold mt-1">{dateStr}</div>
        <div className="mt-3 border-t border-white/30 pt-3">
          <div className="text-xs opacity-75">Keyingi namoz</div>
          <div className="text-2xl font-bold mt-1">
            {PRAYER_NAMES[nextPrayer as keyof typeof PRAYER_NAMES].icon}{" "}
            {PRAYER_NAMES[nextPrayer as keyof typeof PRAYER_NAMES].name}
          </div>
          <div className="text-sm opacity-90 mt-1">
            {times[nextPrayer as keyof typeof times]} • {remainHours > 0 ? `${remainHours} soat ` : ""}{remainMins} daqiqadan keyin
          </div>
        </div>
      </div>

      {/* Prayer list */}
      <div className="space-y-2">
        {prayers.map(({ key, time }) => {
          const info = PRAYER_NAMES[key as keyof typeof PRAYER_NAMES];
          const isActive = key === currentPrayer;
          const isNext = key === nextPrayer;
          return (
            <div
              key={key}
              className={`flex items-center justify-between rounded-xl px-4 py-3 shadow-sm transition-all ${
                isNext
                  ? "bg-primary text-white scale-[1.02]"
                  : isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <div className={`font-semibold text-sm ${isNext ? "text-white" : "text-foreground"}`}>
                    {info.name}
                  </div>
                  {isNext && <div className="text-xs text-white/80">Keyingi namoz</div>}
                  {isActive && !isNext && <div className="text-xs text-muted-foreground">Hozirgi vaqt</div>}
                </div>
              </div>
              <div className={`text-xl font-bold tabular-nums ${isNext ? "text-white" : "text-primary"}`}>
                {time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hijri note */}
      <div className="rounded-xl bg-muted p-3 text-center text-sm text-muted-foreground">
        🕌 Namoz vaqtlari taqribiy. Aniq vaqt uchun mahalliy imomdan so'rang.
      </div>
    </div>
  );
}
