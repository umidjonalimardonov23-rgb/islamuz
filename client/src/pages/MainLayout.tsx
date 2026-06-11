import { useState } from "react";
import PrayerTimes from "./PrayerTimes";
import Tasbih from "./Tasbih";
import Duas from "./Duas";
import Names99 from "./Names99";
import Hadiths from "./Hadiths";
import IslamicTopics from "./IslamicTopics";
import Settings from "./Settings";

export type Tab = "home" | "prayer" | "tasbih" | "duas" | "names99" | "hadiths" | "topics" | "settings";

const BOTTOM_NAV = [
  { id: "home" as Tab,   icon: "🏠", label: "Bosh sahifa" },
  { id: "prayer" as Tab, icon: "🕐", label: "Namoz" },
  { id: "tasbih" as Tab, icon: "📿", label: "Tasbih" },
  { id: "duas" as Tab,   icon: "🤲", label: "Duolar" },
  { id: "names99" as Tab,icon: "✨", label: "99 Ism" },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":    return <HomePage setTab={setActiveTab} />;
      case "prayer":  return <PrayerTimes />;
      case "tasbih":  return <Tasbih />;
      case "duas":    return <Duas />;
      case "names99": return <Names99 />;
      case "hadiths": return <Hadiths />;
      case "topics":  return <IslamicTopics />;
      case "settings":return <Settings />;
      default:        return <HomePage setTab={setActiveTab} />;
    }
  };

  const pageTitle: Record<Tab, string> = {
    home: "Islomiy Ilova",
    prayer: "Namoz Vaqtlari",
    tasbih: "Tasbih",
    duas: "Duolar",
    names99: "Allohning 99 Ismi",
    hadiths: "Hadislar",
    topics: "Islomiy Mavzular",
    settings: "Sozlamalar",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[430px] mx-auto shadow-2xl">

      {/* Top header */}
      <header className="green-gradient text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <button
              onClick={() => setActiveTab("home")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors mr-1"
            >
              ‹
            </button>
          )}
          <div>
            <div className="font-bold text-base leading-tight">{pageTitle[activeTab]}</div>
            {activeTab === "home" && (
              <div className="text-xs text-white/75">Assalamu alaykum 🌿</div>
            )}
          </div>
        </div>
        <button
          onClick={() => setActiveTab("settings")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-lg"
        >
          ⚙️
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-card border-t border-border z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex">
          {BOTTOM_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all tap-active ${
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={`text-xl transition-transform ${activeTab === item.id ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span className={`text-[9px] font-medium ${activeTab === item.id ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(["hadiths","topics","settings"].includes(activeTab) ? activeTab : "hadiths")}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all tap-active ${
              ["hadiths","topics","settings"].includes(activeTab)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl">☰</span>
            <span className="text-[9px] font-medium">Ko'proq</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

const MENU_ITEMS = [
  { tab: "prayer" as Tab,  emoji: "🕌", title: "Namoz Vaqtlari", sub: "Toshkent shahri", color: "#0f4c81", bg: "#e8f4fd" },
  { tab: "tasbih" as Tab,  emoji: "📿", title: "Tasbih",          sub: "Elektron hisoblagich", color: "#065f46", bg: "#d1fae5" },
  { tab: "duas" as Tab,    emoji: "🤲", title: "Duolar",          sub: "To'liq to'plam", color: "#5b21b6", bg: "#ede9fe" },
  { tab: "names99" as Tab, emoji: "✨", title: "99 Ismlar",       sub: "Asmaul husna", color: "#92400e", bg: "#fef3c7" },
  { tab: "hadiths" as Tab, emoji: "📚", title: "Hadislar",        sub: "Sahih hadislar", color: "#1e3a5f", bg: "#dbeafe" },
  { tab: "topics" as Tab,  emoji: "🕋", title: "Islomiy Mavzular",sub: "5 ustun va aqida", color: "#7f1d1d", bg: "#fee2e2" },
];

function HomePage({ setTab }: { setTab: (t: Tab) => void }) {
  const now = new Date();
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
  const days = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];

  return (
    <div>
      {/* Prayer times mini banner */}
      <div
        className="prayer-bg text-white px-4 pt-4 pb-6 cursor-pointer"
        onClick={() => setTab("prayer")}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-white/60 uppercase tracking-widest">Toshkent</div>
            <div className="text-sm font-medium text-white/90">
              {days[now.getDay()]}, {now.getDate()} {months[now.getMonth()]}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60">Namoz vaqtlari →</div>
            <div className="text-xs text-green-300 mt-0.5">Ko'rish uchun bosing</div>
          </div>
        </div>

        {/* Mini mosque silhouette */}
        <div className="relative h-16 flex items-end justify-center overflow-hidden mb-2">
          <svg viewBox="0 0 400 80" className="w-full h-full opacity-30" preserveAspectRatio="xMidYMax meet">
            <rect x="0" y="40" width="400" height="40" fill="#10b981" opacity="0.5"/>
            <rect x="170" y="10" width="60" height="70" fill="#10b981"/>
            <ellipse cx="200" cy="10" rx="30" ry="20" fill="#10b981"/>
            <rect x="195" y="0" width="10" height="15" fill="#34d399"/>
            <polygon points="200,0 198,5 202,5" fill="#6ee7b7"/>
            <rect x="100" y="30" width="40" height="50" fill="#0d9488"/>
            <ellipse cx="120" cy="30" rx="20" ry="12" fill="#0d9488"/>
            <rect x="260" y="30" width="40" height="50" fill="#0d9488"/>
            <ellipse cx="280" cy="30" rx="20" ry="12" fill="#0d9488"/>
            <rect x="40" y="45" width="30" height="35" fill="#065f46"/>
            <rect x="330" y="45" width="30" height="35" fill="#065f46"/>
          </svg>
        </div>
      </div>

      {/* Ayat al-Kursi banner */}
      <div className="mx-4 -mt-3 bg-white dark:bg-card rounded-2xl shadow-md px-4 py-3 border border-border">
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-semibold">📖 Oyati Karima</div>
        <p className="arabic text-right text-lg text-primary leading-relaxed">
          إِنَّ مَعَ الْعُسْرِ يُسْرًا
        </p>
        <p className="text-xs text-muted-foreground mt-1.5 italic">
          "Albatta, qiyinchilik bilan birga yengillik bor." — Ash-Sharh 6
        </p>
      </div>

      {/* Menu grid */}
      <div className="p-4 grid grid-cols-2 gap-3 mt-1">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.tab}
            onClick={() => setTab(item.tab)}
            className="rounded-2xl p-4 text-left tap-active card-hover shadow-sm border border-transparent"
            style={{ backgroundColor: item.bg }}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="font-bold text-sm" style={{ color: item.color }}>{item.title}</div>
            <div className="text-xs mt-0.5 opacity-70" style={{ color: item.color }}>{item.sub}</div>
          </button>
        ))}
      </div>

      {/* Hadith of day */}
      <div className="mx-4 mb-4 rounded-2xl bg-white dark:bg-card border border-border p-4 shadow-sm">
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2">📚 Hadis</div>
        <p className="arabic text-right text-base text-primary">
          طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
        </p>
        <p className="text-sm text-foreground mt-2">"Ilm o'rganish har bir musulmonga farzdir."</p>
        <p className="text-xs text-muted-foreground mt-1">— Ibn Moja</p>
      </div>
    </div>
  );
}
