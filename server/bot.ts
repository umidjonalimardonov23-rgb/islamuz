import { Telegraf, Markup, Context } from "telegraf";
import type { Express } from "express";
import { PRAYER_TIMES_TASHKENT, NAMES_99, HADITHS, DUAS } from "../shared/islamicData";
import { log } from "./vite";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const ADMIN_ID = Number(process.env.ADMIN_ID ?? "8787603995");

// Get Mini App URL — works on Railway, Replit, Render, and any hosting
const MINI_APP_URL =
  process.env.MINI_APP_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : process.env.REPLIT_DOMAINS
      ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
      : process.env.RENDER_EXTERNAL_URL ||
        `http://localhost:${process.env.PORT || 5000}`);

export function setupBot(app: Express) {
  if (!TOKEN) {
    console.log("⚠️  TELEGRAM_BOT_TOKEN not set, skipping bot startup");
    return;
  }
  console.log("🤖 Bot ishga tushmoqda...");

  const bot = new Telegraf(TOKEN);

  // ─── Helper ──────────────────────────────────────────────────────────────
  function mainMenu() {
    return Markup.keyboard([
      ["🕌 Namoz vaqtlari", "📿 Tasbih"],
      ["🤲 Duolar",          "✨ 99 Ismlar"],
      ["📚 Hadislar",        "🕋 Islomiy mavzular"],
      ["⚙️ Sozlamalar",      "ℹ️ Ma'lumot"],
    ]).resize();
  }

  function miniAppButton(text = "🌿 Ilovani ochish") {
    return Markup.inlineKeyboard([
      [Markup.button.webApp(text, MINI_APP_URL)],
    ]);
  }

  // ─── /start ──────────────────────────────────────────────────────────────
  bot.start(async (ctx) => {
    const name = ctx.from?.first_name ?? "do'stim";
    await ctx.replyWithPhoto(
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Masjid_Al_Haram_-_Flickr_-_Al_Jazeera_English.jpg/1280px-Masjid_Al_Haram_-_Flickr_-_Al_Jazeera_English.jpg" },
      {
        caption:
          `*Assalamu alaykum, ${name}! 🌿*\n\n` +
          `*Islomiy Mini App Botga xush kelibsiz!*\n\n` +
          `Bu bot orqali siz:\n` +
          `🕌 Namoz vaqtlarini bilib olasiz\n` +
          `📿 Elektron tasbih ishlatishingiz mumkin\n` +
          `🤲 Duolarni o'qib olasiz\n` +
          `✨ Allohning 99 ismini bilib olasiz\n` +
          `📚 Hadislar o'qishingiz mumkin\n\n` +
          `Ilovani to'liq ishlatish uchun quyidagi tugmani bosing 👇`,
        parse_mode: "Markdown",
        reply_markup: miniAppButton("🌿 Ilovani ochish").reply_markup,
      }
    );
    await ctx.reply("Yoki quyidagi menyudan tanlang:", mainMenu());
  });

  // ─── /help ───────────────────────────────────────────────────────────────
  bot.command("help", async (ctx) => {
    await ctx.reply(
      `*📋 Komandalar ro'yxati:*\n\n` +
      `/start — Botni boshlash\n` +
      `/prayer — Namoz vaqtlari\n` +
      `/tasbih — Tasbih hisoblagichi\n` +
      `/names99 — 99 ismlar\n` +
      `/hadith — Tasodifiy hadis\n` +
      `/app — Ilovani ochish\n` +
      `/about — Bot haqida\n\n` +
      `*Tugmalar orqali ham ishlaydi! ⬇️*`,
      { parse_mode: "Markdown", ...mainMenu() }
    );
  });

  // ─── /app ────────────────────────────────────────────────────────────────
  bot.command("app", async (ctx) => {
    await ctx.reply(
      "🌿 *Islomiy Ilovani oching:*",
      { parse_mode: "Markdown", ...miniAppButton() }
    );
  });

  // ─── /prayer ─────────────────────────────────────────────────────────────
  bot.command("prayer", prayerHandler);
  bot.hears("🕌 Namoz vaqtlari", prayerHandler);

  async function prayerHandler(ctx: Context) {
    const now = new Date();
    const month = now.getMonth() + 1;
    const times = PRAYER_TIMES_TASHKENT[month];
    const pad = (n: number) => String(n).padStart(2, "0");

    const prayers = [
      { icon: "🌄", name: "Bomdod",  ar: "الفجر",  time: times.fajr },
      { icon: "🌅", name: "Quyosh",  ar: "الشروق", time: times.sunrise },
      { icon: "☀️", name: "Peshin",  ar: "الظهر",  time: times.dhuhr },
      { icon: "🌤️", name: "Asr",    ar: "العصر",  time: times.asr },
      { icon: "🌆", name: "Shom",    ar: "المغرب", time: times.maghrib },
      { icon: "🌙", name: "Xufton",  ar: "العشاء", time: times.isha },
    ];

    const months = ["","Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
    const days = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];

    const curMin = now.getHours() * 60 + now.getMinutes();
    const toMin = (t: string) => { const [h,m] = t.split(":").map(Number); return h*60+m; };
    let nextIdx = 0;
    for (let i = 0; i < prayers.length; i++) {
      if (curMin >= toMin(prayers[i].time)) nextIdx = (i + 1) % prayers.length;
    }

    let msg = `🕌 *Namoz Vaqtlari — Toshkent*\n`;
    msg += `📅 ${days[now.getDay()]}, ${now.getDate()} ${months[month]}\n`;
    msg += `🕐 Hozir: ${pad(now.getHours())}:${pad(now.getMinutes())}\n\n`;

    prayers.forEach((p, i) => {
      const arrow = i === nextIdx ? " ◀️ *keyingi*" : "";
      msg += `${p.icon} *${p.name}* — \`${p.time}\`${arrow}\n`;
    });

    msg += `\n📍 _Vaqtlar taqribiy. Mahalliy masjidga murojaat qiling._`;

    await ctx.reply(msg, {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([[Markup.button.webApp("🌿 Ilovada ko'rish", MINI_APP_URL)]]),
    });
  }

  // ─── Tasbih ──────────────────────────────────────────────────────────────
  const tasbihCounts: Record<number, number> = {};

  bot.command("tasbih", tasbihHandler);
  bot.hears("📿 Tasbih", tasbihHandler);

  async function tasbihHandler(ctx: Context) {
    const userId = ctx.from!.id;
    tasbihCounts[userId] = tasbihCounts[userId] ?? 0;

    await ctx.reply(
      `📿 *Tasbih Hisoblagich*\n\n` +
      `سُبْحَانَ اللَّهِ — Subhonalloh\n\n` +
      `Hozirgi hisob: *${tasbihCounts[userId]}*`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback("➕ +1", "tasbih_1"),
            Markup.button.callback("➕ +10", "tasbih_10"),
            Markup.button.callback("🔄 Reset", "tasbih_reset"),
          ],
          [Markup.button.webApp("📿 To'liq tasbih", MINI_APP_URL)],
        ]),
      }
    );
  }

  bot.action("tasbih_1", async (ctx) => {
    const userId = ctx.from!.id;
    tasbihCounts[userId] = (tasbihCounts[userId] ?? 0) + 1;
    const count = tasbihCounts[userId];
    const msg = count % 33 === 0 && count > 0 ? `\n\n🎉 *${count / 33} marta tugallandi!*` : "";
    await ctx.editMessageText(
      `📿 *Tasbih Hisoblagich*\n\nسُبْحَانَ اللَّهِ — Subhonalloh\n\nHozirgi hisob: *${count}*${msg}`,
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback("➕ +1", "tasbih_1"),
            Markup.button.callback("➕ +10", "tasbih_10"),
            Markup.button.callback("🔄 Reset", "tasbih_reset"),
          ],
          [Markup.button.webApp("📿 To'liq tasbih", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery(`✅ ${count}`);
  });

  bot.action("tasbih_10", async (ctx) => {
    const userId = ctx.from!.id;
    tasbihCounts[userId] = (tasbihCounts[userId] ?? 0) + 10;
    const count = tasbihCounts[userId];
    await ctx.editMessageText(
      `📿 *Tasbih Hisoblagich*\n\nسُبْحَانَ اللَّهِ — Subhonalloh\n\nHozirgi hisob: *${count}*`,
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback("➕ +1", "tasbih_1"),
            Markup.button.callback("➕ +10", "tasbih_10"),
            Markup.button.callback("🔄 Reset", "tasbih_reset"),
          ],
          [Markup.button.webApp("📿 To'liq tasbih", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery(`✅ +10 = ${count}`);
  });

  bot.action("tasbih_reset", async (ctx) => {
    const userId = ctx.from!.id;
    tasbihCounts[userId] = 0;
    await ctx.editMessageText(
      `📿 *Tasbih Hisoblagich*\n\nسُبْحَانَ اللَّهِ — Subhonalloh\n\nHozirgi hisob: *0*\n\n🔄 _Nolga qaytarildi_`,
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.callback("➕ +1", "tasbih_1"),
            Markup.button.callback("➕ +10", "tasbih_10"),
            Markup.button.callback("🔄 Reset", "tasbih_reset"),
          ],
          [Markup.button.webApp("📿 To'liq tasbih", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery("🔄 Reset qilindi");
  });

  // ─── Duas ────────────────────────────────────────────────────────────────
  bot.hears("🤲 Duolar", async (ctx) => {
    const cats = DUAS.map((c, i) => Markup.button.callback(`${c.icon} ${c.category}`, `dua_cat_${i}`));
    await ctx.reply(
      "🤲 *Duolar To'plami*\n\nQaysi kategoriyani ko'rmoqchisiz?",
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          cats.slice(0, 2),
          cats.slice(2, 4),
          [Markup.button.webApp("🌿 Ilovada ko'rish", MINI_APP_URL)],
        ]),
      }
    );
  });

  DUAS.forEach((cat, catIdx) => {
    bot.action(`dua_cat_${catIdx}`, async (ctx) => {
      const items = cat.items.map((d, i) =>
        [Markup.button.callback(d.title, `dua_${catIdx}_${i}`)]
      );
      await ctx.editMessageText(
        `${cat.icon} *${cat.category}*\n\nQaysi duoni ko'rmoqchisiz?`,
        {
          parse_mode: "Markdown",
          reply_markup: Markup.inlineKeyboard([
            ...items,
            [Markup.button.callback("⬅️ Orqaga", "dua_back")],
          ]).reply_markup,
        }
      );
      await ctx.answerCbQuery();
    });

    cat.items.forEach((dua, duaIdx) => {
      bot.action(`dua_${catIdx}_${duaIdx}`, async (ctx) => {
        await ctx.editMessageText(
          `🤲 *${dua.title}*\n\n` +
          `*Arabcha:*\n${dua.arabic}\n\n` +
          `*Tarjima:*\n${dua.uzbek}\n\n` +
          `_${dua.transliteration}_`,
          {
            parse_mode: "Markdown",
            reply_markup: Markup.inlineKeyboard([
              [Markup.button.callback(`⬅️ ${cat.category}`, `dua_cat_${catIdx}`)],
              [Markup.button.webApp("🌿 Ilovada ko'rish", MINI_APP_URL)],
            ]).reply_markup,
          }
        );
        await ctx.answerCbQuery();
      });
    });
  });

  bot.action("dua_back", async (ctx) => {
    const cats = DUAS.map((c, i) => Markup.button.callback(`${c.icon} ${c.category}`, `dua_cat_${i}`));
    await ctx.editMessageText(
      "🤲 *Duolar To'plami*\n\nQaysi kategoriyani ko'rmoqchisiz?",
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          cats.slice(0, 2),
          cats.slice(2, 4),
          [Markup.button.webApp("🌿 Ilovada ko'rish", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery();
  });

  // ─── 99 Names ────────────────────────────────────────────────────────────
  bot.command("names99", names99Handler);
  bot.hears("✨ 99 Ismlar", names99Handler);

  async function names99Handler(ctx: Context) {
    const random = NAMES_99[Math.floor(Math.random() * NAMES_99.length)];
    await ctx.reply(
      `✨ *Allohning 99 Go'zal Ismi*\n\n` +
      `*#${random.number}*\n` +
      `*Arabcha:* ${random.arabic}\n` +
      `*Translit:* ${random.transliteration}\n` +
      `*Ma'nosi:* ${random.uzbek}`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("🔀 Tasodifiy ism", "name_random")],
          [Markup.button.webApp("✨ Barchasini ko'rish", MINI_APP_URL)],
        ]),
      }
    );
  }

  bot.action("name_random", async (ctx) => {
    const random = NAMES_99[Math.floor(Math.random() * NAMES_99.length)];
    await ctx.editMessageText(
      `✨ *Allohning 99 Go'zal Ismi*\n\n` +
      `*#${random.number}*\n` +
      `*Arabcha:* ${random.arabic}\n` +
      `*Translit:* ${random.transliteration}\n` +
      `*Ma'nosi:* ${random.uzbek}`,
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("🔀 Tasodifiy ism", "name_random")],
          [Markup.button.webApp("✨ Barchasini ko'rish", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery();
  });

  // ─── Hadiths ─────────────────────────────────────────────────────────────
  bot.command("hadith", hadithHandler);
  bot.hears("📚 Hadislar", hadithHandler);

  async function hadithHandler(ctx: Context) {
    const h = HADITHS[Math.floor(Math.random() * HADITHS.length)];
    await ctx.reply(
      `📚 *Hadis*\n\n` +
      `_${h.arabic}_\n\n` +
      `"${h.text}"\n\n` +
      `— *${h.source}* · ${h.category}`,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("🔀 Boshqa hadis", "hadith_random")],
          [Markup.button.webApp("📚 Ko'proq hadislar", MINI_APP_URL)],
        ]),
      }
    );
  }

  bot.action("hadith_random", async (ctx) => {
    const h = HADITHS[Math.floor(Math.random() * HADITHS.length)];
    await ctx.editMessageText(
      `📚 *Hadis*\n\n` +
      `_${h.arabic}_\n\n` +
      `"${h.text}"\n\n` +
      `— *${h.source}* · ${h.category}`,
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("🔀 Boshqa hadis", "hadith_random")],
          [Markup.button.webApp("📚 Ko'proq hadislar", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery();
  });

  // ─── Islamic Topics ───────────────────────────────────────────────────────
  bot.hears("🕋 Islomiy mavzular", async (ctx) => {
    await ctx.reply(
      "🕋 *Islomiy Mavzular*\n\nIslomning besh ustuni va asosiy aqidalar:",
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("☝️ Tavhid", "topic_tawhid"), Markup.button.callback("🕌 Namoz", "topic_salah")],
          [Markup.button.callback("💰 Zakot", "topic_zakat"), Markup.button.callback("🌙 Ro'za", "topic_sawm")],
          [Markup.button.callback("🕋 Haj", "topic_hajj")],
          [Markup.button.webApp("🌿 To'liq o'qish", MINI_APP_URL)],
        ]),
      }
    );
  });

  const TOPIC_SHORTS: Record<string, { title: string; text: string }> = {
    tawhid: { title: "☝️ Tavhid — Allohning Yagonaligi", text: "Tavhid – islomning asosiy aqidasi. Alloh yagona, sherigi yo'q, hamma narsa Uning qo'lida.\n\n📖 _'Ayting: U Alloh yagonadir'_ — Al-Ixlos 1" },
    salah: { title: "🕌 Namoz — Islomning Ustuni", text: "Kuniga 5 mahal namoz o'qish har bir musulmonga farz. Namoz — bandaning Alloh bilan muloqoti.\n\n📖 _'Namozni to'kis o'qing'_ — Al-Baqara 43" },
    zakat: { title: "💰 Zakot — Molning Pokligi", text: "Nisob miqdorida mol bo'lsa, yiliga bir marta 2.5% zakot berish farz.\n\n📖 _'Namozni qoim qiling, zakotni bering'_ — Al-Baqara 43" },
    sawm: { title: "🌙 Ro'za — Ramazon Saboqlari", text: "Ramazon oyida 30 kun ro'za tutish farz. Ro'za nafsni tarbiyalaydi, taqvoni oshiradi.\n\n📖 _'Ro'za sizlarga farz qilindi'_ — Al-Baqara 183" },
    hajj: { title: "🕋 Haj — Muqaddas Safar", text: "Imkon bo'lganda hayotida bir marta Makkaga borish farz. Haj gunohlarni yuvadi.\n\n📖 Rasululloh s.a.v.: _'Haj qilgan kishi tug'ilgan kuniday poklanadi'_" },
  };

  Object.entries(TOPIC_SHORTS).forEach(([key, val]) => {
    bot.action(`topic_${key}`, async (ctx) => {
      await ctx.editMessageText(
        `*${val.title}*\n\n${val.text}`,
        {
          parse_mode: "Markdown",
          reply_markup: Markup.inlineKeyboard([
            [Markup.button.callback("⬅️ Orqaga", "topics_back")],
            [Markup.button.webApp("📖 To'liq o'qish", MINI_APP_URL)],
          ]).reply_markup,
        }
      );
      await ctx.answerCbQuery();
    });
  });

  bot.action("topics_back", async (ctx) => {
    await ctx.editMessageText(
      "🕋 *Islomiy Mavzular*\n\nIslomning besh ustuni va asosiy aqidalar:",
      {
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.callback("☝️ Tavhid", "topic_tawhid"), Markup.button.callback("🕌 Namoz", "topic_salah")],
          [Markup.button.callback("💰 Zakot", "topic_zakat"), Markup.button.callback("🌙 Ro'za", "topic_sawm")],
          [Markup.button.callback("🕋 Haj", "topic_hajj")],
          [Markup.button.webApp("🌿 To'liq o'qish", MINI_APP_URL)],
        ]).reply_markup,
      }
    );
    await ctx.answerCbQuery();
  });

  // ─── Settings ─────────────────────────────────────────────────────────────
  bot.hears("⚙️ Sozlamalar", async (ctx) => {
    await ctx.reply(
      "⚙️ *Sozlamalar*\n\n📍 Shahar: *Toshkent*\n🔔 Bildirishnomalar: o'rnatilmagan\n\nTo'liq sozlamalar uchun ilovani oching:",
      {
        parse_mode: "Markdown",
        ...miniAppButton("⚙️ Sozlamalarni ochish"),
      }
    );
  });

  // ─── About ────────────────────────────────────────────────────────────────
  bot.command("about", aboutHandler);
  bot.hears("ℹ️ Ma'lumot", aboutHandler);

  async function aboutHandler(ctx: Context) {
    await ctx.reply(
      `ℹ️ *Bot haqida*\n\n` +
      `🌿 *Islomiy Mini App Bot*\n` +
      `📌 Versiya: 2.0.0\n\n` +
      `*Funksiyalar:*\n` +
      `• 🕌 Namoz vaqtlari (Toshkent)\n` +
      `• 📿 Tasbih hisoblagichi\n` +
      `• 🤲 Duolar to'plami\n` +
      `• ✨ Allohning 99 ismi\n` +
      `• 📚 Islomiy hadislar\n` +
      `• 🕋 Islomiy mavzular\n\n` +
      `_Alloh bizga hidoya bersin!_ 🌿`,
      {
        parse_mode: "Markdown",
        ...miniAppButton("🌿 Ilovani ochish"),
      }
    );
  }

  // ─── Admin commands ──────────────────────────────────────────────────────
  bot.command("admin", async (ctx) => {
    if (ctx.from?.id !== ADMIN_ID) {
      return ctx.reply("❌ Bu buyruq faqat admin uchun!");
    }
    await ctx.reply(
      `👑 *Admin Panel*\n\n` +
      `Bot ishlayapti ✅\n` +
      `Mini App URL: ${MINI_APP_URL}`,
      { parse_mode: "Markdown" }
    );
  });

  // ─── Unknown messages ────────────────────────────────────────────────────
  bot.on("message", async (ctx) => {
    await ctx.reply(
      "Menyudan tanlang yoki /help buyrug'ini yuboring 👇",
      mainMenu()
    );
  });

  // ─── Error handling ──────────────────────────────────────────────────────
  bot.catch((err: unknown, ctx: Context) => {
    console.error(`❌ Bot xatosi (${ctx.updateType}):`, err);
  });

  // ─── Launch: webhook in production, polling in dev ────────────────────────
  const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN;

  if (railwayDomain) {
    // Production: use webhook (avoids 409 conflict with multiple instances)
    const webhookPath = "/telegram-webhook";
    const webhookUrl = `https://${railwayDomain}${webhookPath}`;

    app.use(webhookPath, bot.webhookCallback(webhookPath));

    bot.telegram.setWebhook(webhookUrl, { drop_pending_updates: true })
      .then(() => {
        console.log(`✅ Webhook o'rnatildi: ${webhookUrl}`);
        console.log(`🌐 Mini App URL: ${MINI_APP_URL}`);
        console.log(`👑 Admin ID: ${ADMIN_ID}`);
      })
      .catch((err: unknown) => {
        console.error("❌ Webhook o'rnatishda XATO:", err);
      });
  } else {
    // Development: use long-polling (non-blocking)
    bot.launch({ dropPendingUpdates: true })
      .then(() => {
        console.log("✅ Telegram bot (polling) ishga tushdi!");
        console.log(`🌐 Mini App URL: ${MINI_APP_URL}`);
      })
      .catch((err: unknown) => {
        console.error("❌ Bot polling xatosi:", err);
      });
  }

  process.once("SIGINT",  () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return bot;
}
