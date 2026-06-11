import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [city, setCity] = useState("Toshkent");

  useEffect(() => {
    const s = localStorage.getItem("app_settings");
    if (s) {
      const parsed = JSON.parse(s);
      setDarkMode(parsed.darkMode ?? false);
      setNotifications(parsed.notifications ?? false);
      setCity(parsed.city ?? "Toshkent");
      if (parsed.darkMode) document.documentElement.classList.add("dark");
    }
  }, []);

  const save = (updates: Partial<{ darkMode: boolean; notifications: boolean; city: string }>) => {
    const current = { darkMode, notifications, city, ...updates };
    localStorage.setItem("app_settings", JSON.stringify(current));
  };

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    save({ darkMode: next });
  };

  const CITIES = ["Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon", "Farg'ona", "Qashqadaryo", "Surxondaryo"];

  return (
    <div className="p-4 space-y-4">

      {/* City */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-semibold text-sm text-foreground flex items-center gap-2">📍 Shahar</p>
          <p className="text-xs text-muted-foreground mt-0.5">Namoz vaqtlari uchun shahar</p>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => { setCity(c); save({ city: c }); }}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium tap-active transition-all text-left ${
                city === c
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {city === c ? "✓ " : ""}{c}
            </button>
          ))}
        </div>
        {city !== "Toshkent" && (
          <div className="px-4 pb-3">
            <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg px-3 py-2">
              ⚠️ Hozircha faqat Toshkent uchun namoz vaqtlari mavjud
            </p>
          </div>
        )}
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-semibold text-sm text-foreground">🎨 Ko'rinish</p>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <div className="text-sm font-medium text-foreground">🌙 Tungi rejim</div>
              <div className="text-xs text-muted-foreground">Qorong'u fon</div>
            </div>
            <button
              onClick={toggleDark}
              className={`relative w-11 h-6 rounded-full transition-colors tap-active ${darkMode ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${darkMode ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <div className="text-sm font-medium text-foreground">🔔 Bildirishnomalar</div>
              <div className="text-xs text-muted-foreground">Namoz vaqti eslatmalari</div>
            </div>
            <button
              onClick={() => { const n = !notifications; setNotifications(n); save({ notifications: n }); }}
              className={`relative w-11 h-6 rounded-full transition-colors tap-active ${notifications ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${notifications ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-semibold text-sm text-foreground">ℹ️ Ilova haqida</p>
        </div>
        {[
          ["Versiya", "2.0.0"],
          ["Manbalar", "islom.uz"],
          ["Til", "O'zbek"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center px-4 py-3 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{k}</span>
            <span className="text-sm font-semibold text-foreground">{v}</span>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="font-semibold text-sm text-foreground">🔗 Foydali havolalar</p>
        </div>
        {[
          { icon: "🌐", title: "islom.uz", sub: "Islomiy ma'rifat maskani" },
          { icon: "📖", title: "Qur'on.uz", sub: "Muqaddas kitob" },
          { icon: "🕌", title: "Mahalliy masjid", sub: "Namoz vaqtlari uchun" },
        ].map(item => (
          <div key={item.title} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
            <span className="text-xl">{item.icon}</span>
            <div>
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dua */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
        <p className="arabic text-primary text-xl">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</p>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          "Rabbimiz, bizga dunyoda ham, oxiratda ham yaxshilik ber va jahannam azobidan asra."
        </p>
      </div>

      <p className="text-center text-xs text-muted-foreground pb-2">🌿 Islomiy Ilova v2.0.0 • Alloh bizga hidoya bersin!</p>
    </div>
  );
}
