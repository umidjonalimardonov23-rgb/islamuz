import { useState } from "react";
import PrayerTimes from "./PrayerTimes";
import Tasbih from "./Tasbih";
import Duas from "./Duas";
import Names99 from "./Names99";
import Hadiths from "./Hadiths";
import IslamicTopics from "./IslamicTopics";
import Settings from "./Settings";

type Tab = "home" | "prayer" | "tasbih" | "duas" | "names99" | "hadiths" | "topics" | "settings";

const NAV_ITEMS = [
  { id: "home" as Tab, icon: "🕌", label: "Bosh" },
  { id: "prayer" as Tab, icon: "🕐", label: "Namoz" },
  { id: "tasbih" as Tab, icon: "📿", label: "Tasbih" },
  { id: "duas" as Tab, icon: "🤲", label: "Duolar" },
  { id: "names99" as Tab, icon: "✨", label: "99 Ism" },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":       return <HomePage setTab={setActiveTab} />;
      case "prayer":     return <PrayerTimes />;
      case "tasbih":     return <Tasbih />;
      case "duas":       return <Duas />;
      case "names99":    return <Names99 />;
      case "hadiths":    return <Hadiths />;
      case "topics":     return <IslamicTopics />;
      case "settings":   return <Settings />;
      default:           return <HomePage setTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="islamic-gradient text-white px-4 pt-10 pb-6 text-center shadow-lg">
        <div className="text-2xl font-bold tracking-wide">🌿 Islomiy Ilova</div>
        <div className="arabic-text text-lg mt-1 opacity-90">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <div className="text-sm mt-1 opacity-75">Assalamu alaykum</div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-card border-t border-border shadow-2xl z-50">
        <div className="flex justify-around items-center h-16">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all ${
                activeTab === item.id
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab("topics")}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all ${
              ["hadiths","topics","settings"].includes(activeTab)
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span className="text-xl">☰</span>
            <span className="text-[10px] font-medium">Ko'proq</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function HomePage({ setTab }: { setTab: (t: Tab) => void }) {
  const menuItems = [
    { tab: "prayer" as Tab,  icon: "🕌", title: "Namoz Vaqtlari", desc: "Toshkent shahri", color: "from-indigo-500 to-indigo-600" },
    { tab: "tasbih" as Tab,  icon: "📿", title: "Tasbih",          desc: "Elektron hisoblagich", color: "from-emerald-500 to-emerald-600" },
    { tab: "duas" as Tab,    icon: "🤲", title: "Duolar",          desc: "Kundalik duolar", color: "from-teal-500 to-teal-600" },
    { tab: "names99" as Tab, icon: "✨", title: "99 Ismlar",       desc: "Allohning ismlari", color: "from-green-600 to-green-700" },
    { tab: "hadiths" as Tab, icon: "📚", title: "Hadislar",        desc: "Payg'ambar (s.a.v.) so'zlari", color: "from-lime-600 to-lime-700" },
    { tab: "topics" as Tab,  icon: "🕋", title: "Islomiy Mavzular",desc: "Tawhid, Salah, Zakat...", color: "from-cyan-600 to-cyan-700" },
    { tab: "settings" as Tab,icon: "⚙️", title: "Sozlamalar",     desc: "Ilova sozlamalari", color: "from-slate-500 to-slate-600" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Daily verse card */}
      <div className="rounded-2xl islamic-gradient text-white p-5 shadow-md">
        <div className="text-xs font-semibold opacity-75 mb-2">📖 Oyati Karima</div>
        <p className="arabic-text text-xl text-right leading-loose">
          إِنَّ مَعَ الْعُسْرِ يُسْرًا
        </p>
        <p className="text-sm mt-2 opacity-90 italic">"Albatta, qiyinchilik bilan birga yengillik bor."</p>
        <p className="text-xs mt-1 opacity-70">— Ash-Sharh, 6</p>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => setTab(item.tab)}
            className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-4 flex flex-col items-start gap-1 shadow-md hover:scale-105 active:scale-95 transition-transform text-left`}
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="font-semibold text-sm mt-1">{item.title}</span>
            <span className="text-xs opacity-80">{item.desc}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-muted-foreground text-xs">وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</p>
        <p className="text-muted-foreground text-xs mt-1">Allohdan qo'rqqan kishiga Alloh chiqish yo'lini ko'rsatadi</p>
      </div>
    </div>
  );
}
