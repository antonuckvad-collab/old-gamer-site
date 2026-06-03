// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "main";
var PLATFORM_OPTIONS = [
  { value: "ps5", label: "PlayStation 5" },
  { value: "ps4", label: "PlayStation 4" },
  { value: "ps3", label: "PlayStation 3" },
  { value: "ps2", label: "PlayStation 2" },
  { value: "xbox", label: "Xbox Series X|S" },
  { value: "xboxone", label: "Xbox One" },
  { value: "switch", label: "Nintendo Switch" },
  { value: "switch2", label: "Nintendo Switch 2" },
  { value: "pc", label: "PC / Steam" }
];
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Глобальные настройки сайта ─────────────────────────────
      {
        name: "settings",
        label: "\u2699\uFE0F \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0430\u0439\u0442\u0430",
        path: "content/settings",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        match: { include: "site" },
        fields: [
          { type: "string", name: "phone", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", required: true },
          { type: "string", name: "tg_orders", label: "Telegram \u0434\u043B\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432 (URL)" },
          { type: "string", name: "tg_channel", label: "Telegram \u043A\u0430\u043D\u0430\u043B (URL)" },
          { type: "string", name: "avito_url", label: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0410\u0432\u0438\u0442\u043E" },
          { type: "string", name: "address", label: "\u0410\u0434\u0440\u0435\u0441 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430", ui: { component: "textarea" } },
          { type: "string", name: "hours_label", label: "\u0427\u0430\u0441\u044B \u0440\u0430\u0431\u043E\u0442\u044B (\u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F)", description: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 10:00 \u2014 21:00" },
          { type: "number", name: "hours_open", label: "\u0427\u0430\u0441 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F (0-23)" },
          { type: "number", name: "hours_close", label: "\u0427\u0430\u0441 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F (0-23)" },
          {
            type: "object",
            name: "hero",
            label: "\u0413\u043B\u0430\u0432\u043D\u044B\u0439 \u0431\u043B\u043E\u043A (Hero)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u043D\u0430\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C" },
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "lead", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0432 hero",
            list: true,
            fields: [
              { type: "string", name: "number", label: "\u0426\u0438\u0444\u0440\u0430 (50+, 3 \u043C\u0435\u0441)" },
              { type: "string", name: "label", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C" }
            ]
          },
          {
            type: "object",
            name: "tradein_prices",
            label: "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0442\u0440\u0435\u0439\u0434-\u0438\u043D (\u0446\u0435\u043D\u044B \u20BD)",
            fields: [
              { type: "number", name: "ps5", label: "PlayStation 5 Slim" },
              { type: "number", name: "ps4", label: "PlayStation 4 Pro" },
              { type: "number", name: "xboxsx", label: "Xbox Series X" },
              { type: "number", name: "switch", label: "Switch OLED" },
              { type: "number", name: "ps3", label: "PlayStation 3" }
            ]
          },
          {
            type: "image",
            name: "shop_photos",
            label: "\u0424\u043E\u0442\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430 (\u0441\u043B\u0430\u0439\u0434\u0435\u0440)",
            list: true
          }
        ]
      },
      // ─── Каталог категорий ──────────────────────────────────────
      {
        name: "category",
        label: "\u{1F4E6} \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430",
        path: "content/categories",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", isTitle: true, required: true },
          { type: "string", name: "count", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u0441 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\u043C", description: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 50+ \u043A\u043E\u043D\u0441\u043E\u043B\u0435\u0439" },
          { type: "string", name: "badge", label: "\u0411\u0435\u0439\u0434\u0436 (\u0425\u0438\u0442 / \u041D\u043E\u0432\u0438\u043D\u043A\u0430)" },
          { type: "string", name: "url", label: "\u0421\u0441\u044B\u043B\u043A\u0430" },
          { type: "image", name: "image", label: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430" },
          { type: "number", name: "order", label: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A (1, 2, 3, 4)" }
        ]
      },
      // ─── Услуги ──────────────────────────────────────────────────
      {
        name: "service",
        label: "\u{1F6E0} \u0423\u0441\u043B\u0443\u0433\u0438",
        path: "content/services",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", isTitle: true, required: true },
          { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
          { type: "string", name: "cta_label", label: "\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438", description: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 / \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" },
          { type: "string", name: "cta_url", label: "\u041A\u0443\u0434\u0430 \u0432\u0435\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430" },
          { type: "number", name: "order", label: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A (1-4)" }
        ]
      },
      // ─── Предзаказы / Диски ─────────────────────────────────────
      {
        name: "disc",
        label: "\u{1F3AE} \u041F\u0440\u0435\u0434\u0437\u0430\u043A\u0430\u0437\u044B (\u0434\u0438\u0441\u043A\u0438)",
        path: "content/disks",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0433\u0440\u044B", isTitle: true, required: true },
          {
            type: "string",
            name: "platform",
            label: "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430",
            required: true,
            options: PLATFORM_OPTIONS,
            description: "\u0415\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B \u043D\u0435\u0442 \u2014 \u043F\u043E\u043F\u0440\u043E\u0441\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C"
          },
          { type: "string", name: "price", label: "\u0426\u0435\u043D\u0430", description: "4 999 \u20BD" },
          { type: "string", name: "release", label: "\u0421\u0442\u0430\u0442\u0443\u0441 / \u0434\u0430\u0442\u0430 \u0440\u0435\u043B\u0438\u0437\u0430", description: "\u0420\u0435\u043B\u0438\u0437: \u043E\u0441\u0435\u043D\u044C 2026 \u0438\u043B\u0438 \u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438 \xB7 3 \u0448\u0442." },
          {
            type: "string",
            name: "status",
            label: "\u0421\u0442\u0430\u0442\u0443\u0441",
            options: [
              { value: "preorder", label: "\u041F\u0440\u0435\u0434\u0437\u0430\u043A\u0430\u0437" },
              { value: "stock", label: "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438" }
            ]
          },
          { type: "string", name: "meta", label: "\u0416\u0430\u043D\u0440 / \u0441\u0442\u0443\u0434\u0438\u044F", description: "Action \xB7 Open World \xB7 Rockstar" },
          { type: "image", name: "image", label: "\u041E\u0431\u043B\u043E\u0436\u043A\u0430 \u0438\u0433\u0440\u044B", description: "600\xD7800px, JPG/PNG, \u0434\u043E 300KB" },
          { type: "boolean", name: "active", label: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435", required: true },
          { type: "number", name: "order", label: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A (\u043C\u0435\u043D\u044C\u0448\u0435 = \u0432\u044B\u0448\u0435)" }
        ]
      },
      // ─── Страницы (тексты) ──────────────────────────────────────
      {
        name: "page",
        label: "\u{1F4C4} \u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B (\u0442\u0435\u043A\u0441\u0442\u044B)",
        path: "content/pages",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", isTitle: true, required: true },
          { type: "rich-text", name: "body", label: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
