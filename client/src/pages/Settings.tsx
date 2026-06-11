import { useState, useEffect } from "react";

export default function Settings() {
  const [language, setLanguage] = useState("uz");
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("Toshkent");

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      const s = JSON.parse(saved);
      setLanguage(s.language ?? "uz");
      setNotifications(s.notifications ?? false);
      setDarkMode(s.darkMode ?? false);
      setCity(s.city ?? "Toshkent");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    saveSettings();
  }, [darkMode]);

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify({ language, notifications, darkMode, city }));
  };

  const appInfo = [
    { label: "Versiya", value: "2.0.0" },
    { label: "Ishlab chiquvchi", value: "Islomiy Ilova" },
    { label: "Manba", value: "islom.uz" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl islamic-gradient text-white p-4 text-center shadow-md">
        <div className="text-3xl mb-1">⚙️</div>
        <div className="text-lg font-bold">Sozlamalar</div>
        <div className="text-xs opacity-80 mt-0.5">Ilovani o'zingizga sozlang</div>
      </div>

      {/* City */}
      <div className="rounded-2xl bg-card border border-border p-4 shadow-sm space-y-3">
        <div className="text-sm font-bold text-foreground flex items-center gap-2">
          📍 Shahar
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon", "Farg'ona"].map((c) => (
            <button
              key={c}
              onClick={() => { setCity(c); saveSettings(); }}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                city === c
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {city !== "Toshkent" && (
          <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950 rounded-lg px-3 py-2">
            ⚠️ Hozircha faqat Toshkent namoz vaqtlari mavjud
          </p>
        )}
      </div>

      {/* Language */}
      <div className="rounded-2xl bg-card border border-border p-4 shadow-sm space-y-3">
        <div className="text-sm font-bold text-foreground flex items-center gap-2">
          🌐 Til
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { code: "uz", label: "O'zbek 🇺🇿" },
            { code: "ru", label: "Русский 🇷🇺" },
            { code: "en", label: "English 🇺🇸" },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); saveSettings(); }}
              className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                language === lang.code
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <div>
            <div className="text-sm font-semibold text-foreground">🌙 Tungi rejim</div>
            <div className="text-xs text-muted-foreground">Qorong'u fon</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${darkMode ? "left-6" : "left-0.5"}`} />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <div className="text-sm font-semibold text-foreground">🔔 Bildirishnomalar</div>
            <div className="text-xs text-muted-foreground">Namoz vaqti eslatmalari</div>
          </div>
          <button
            onClick={() => { setNotifications(!notifications); saveSettings(); }}
            className={`w-12 h-6 rounded-full transition-all relative ${notifications ? "bg-primary" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifications ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* App info */}
      <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <div className="text-sm font-bold text-foreground">ℹ️ Ilova haqida</div>
        </div>
        {appInfo.map((item, i) => (
          <div key={i} className={`flex justify-between items-center px-4 py-3 ${i < appInfo.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-semibold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Dua */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
        <p className="arabic-text text-primary text-lg">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً</p>
        <p className="text-xs text-muted-foreground mt-2">
          "Rabbimiz, bizga dunyoda ham, oxiratda ham yaxshilik ber."
        </p>
      </div>

      <div className="text-center py-2">
        <p className="text-xs text-muted-foreground">🌿 Islomiy Ilova v2.0.0</p>
        <p className="text-xs text-muted-foreground">Alloh bizga hidoya bersin!</p>
      </div>
    </div>
  );
}
