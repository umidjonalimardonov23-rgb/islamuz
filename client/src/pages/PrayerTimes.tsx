import { useState, useEffect } from "react";
import { PRAYER_TIMES_TASHKENT } from "@/lib/islamicData";

const PRAYERS = [
  { key: "fajr",    nameUz: "Bomdod",  nameAr: "الفجر",   icon: "🌄" },
  { key: "sunrise", nameUz: "Quyosh",  nameAr: "الشروق",  icon: "🌅" },
  { key: "dhuhr",   nameUz: "Peshin",  nameAr: "الظهر",   icon: "☀️" },
  { key: "asr",     nameUz: "Asr",     nameAr: "العصر",   icon: "🌤️" },
  { key: "maghrib", nameUz: "Shom",    nameAr: "المغرب",  icon: "🌆" },
  { key: "isha",    nameUz: "Xufton",  nameAr: "العشاء",  icon: "🌙" },
] as const;

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function PrayerTimes() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const month = now.getMonth() + 1;
  const times = PRAYER_TIMES_TASHKENT[month];
  const curMin = now.getHours() * 60 + now.getMinutes();

  // Find active and next prayer
  let activeIdx = 0;
  for (let i = 0; i < PRAYERS.length; i++) {
    if (curMin >= toMin(times[PRAYERS[i].key as keyof typeof times])) activeIdx = i;
  }
  const nextIdx = (activeIdx + 1) % PRAYERS.length;
  const nextKey = PRAYERS[nextIdx].key as keyof typeof times;
  const nextMin = toMin(times[nextKey]);
  let diff = nextMin - curMin;
  if (diff < 0) diff += 1440;
  const diffH = Math.floor(diff / 60);
  const diffM = diff % 60;
  const diffS = 60 - now.getSeconds();

  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
  const days = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];

  return (
    <div>
      {/* Dark header with mosque */}
      <div className="prayer-bg text-white px-4 pt-5 pb-8">
        {/* Location + date */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-green-300 text-sm font-semibold">
              <span>📍</span> Toshkent
            </div>
            <div className="text-white/70 text-xs mt-0.5">
              {days[now.getDay()]}, {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold tabular-nums tracking-tight">
              {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
            </div>
          </div>
        </div>

        {/* Mosque SVG */}
        <div className="relative h-20 flex items-end justify-center overflow-hidden mb-4">
          <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
            <rect x="0" y="50" width="400" height="40" fill="#0a5c3a" opacity="0.6"/>
            {/* Main mosque */}
            <rect x="155" y="20" width="90" height="70" fill="#0d7a4e"/>
            <ellipse cx="200" cy="20" rx="45" ry="28" fill="#0d7a4e"/>
            <rect x="194" y="0" width="12" height="22" fill="#10b981"/>
            <polygon points="200,-2 196,6 204,6" fill="#34d399"/>
            {/* Side minarets */}
            <rect x="100" y="38" width="28" height="52" fill="#0a6040"/>
            <ellipse cx="114" cy="38" rx="14" ry="9" fill="#0a6040"/>
            <rect x="109" y="29" width="10" height="12" fill="#059669"/>
            <rect x="272" y="38" width="28" height="52" fill="#0a6040"/>
            <ellipse cx="286" cy="38" rx="14" ry="9" fill="#0a6040"/>
            <rect x="281" y="29" width="10" height="12" fill="#059669"/>
            {/* Far buildings */}
            <rect x="30" y="55" width="45" height="35" fill="#065f46" opacity="0.7"/>
            <rect x="325" y="55" width="45" height="35" fill="#065f46" opacity="0.7"/>
            {/* Stars */}
            <circle cx="50" cy="15" r="1.5" fill="white" opacity="0.8"/>
            <circle cx="350" cy="10" r="1.5" fill="white" opacity="0.8"/>
            <circle cx="80" cy="8" r="1" fill="white" opacity="0.6"/>
            <circle cx="320" cy="20" r="1" fill="white" opacity="0.6"/>
          </svg>
        </div>

        {/* Next prayer countdown */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center border border-white/10">
          <div className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Keyingi namoz</div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">{PRAYERS[nextIdx].icon}</span>
            <div>
              <div className="text-lg font-bold text-green-300">{PRAYERS[nextIdx].nameUz}</div>
              <div className="arabic text-white/80 text-base">{PRAYERS[nextIdx].nameAr}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xl font-bold tabular-nums">
                {times[nextKey as keyof typeof times]}
              </div>
              <div className="text-xs text-white/60">
                {diffH > 0 ? `${diffH} soat ` : ""}{diffM} daqiqa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer cards */}
      <div className="p-4 space-y-2 -mt-3">
        {PRAYERS.map((p, i) => {
          const time = times[p.key as keyof typeof times];
          const isActive = i === activeIdx;
          const isNext = i === nextIdx;

          return (
            <div
              key={p.key}
              className={`flex items-center rounded-xl px-4 py-3 shadow-sm transition-all ${
                isNext
                  ? "bg-primary text-white shadow-md scale-[1.01]"
                  : isActive
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-white dark:bg-card border border-border"
              }`}
            >
              <span className="text-2xl w-10">{p.icon}</span>
              <div className="flex-1 ml-1">
                <div className={`font-semibold text-sm ${isNext ? "text-white" : "text-foreground"}`}>
                  {p.nameUz}
                </div>
                <div className={`arabic text-base leading-tight mt-0.5 ${isNext ? "text-white/80" : "text-primary"}`}>
                  {p.nameAr}
                </div>
              </div>
              {isNext && (
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full mr-3">
                  Keyingi
                </span>
              )}
              <div className={`text-xl font-bold tabular-nums ${isNext ? "text-white" : "text-primary"}`}>
                {time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mx-4 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3">
        <p className="text-xs text-amber-800 dark:text-amber-400 text-center">
          ⚠️ Namoz vaqtlari taqribiy hisoblanadi. Aniq vaqt uchun mahalliy masjidga murojaat qiling.
        </p>
      </div>
    </div>
  );
}
