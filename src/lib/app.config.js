// Logo Studio — brand logos from a name and a short brief, optionally from a sketch or an old logo.
// Models: nano-banana-2-1 (create from text; renders the brand name legibly) and
// nano-banana-2-1-edit (redraw a visitor's sketch / old logo). Both cost the same.

export const MODELS = { create: "nano-banana-2-1", fromSketch: "nano-banana-2-1-edit" };

export const STYLES = [
  { id: "minimal", label: { en: "Minimal", ru: "Минимализм" },
    prompt: "a minimalist flat vector logo: one simple geometric symbol next to the name, clean sans-serif wordmark, lots of negative space" },
  { id: "wordmark", label: { en: "Wordmark", ru: "Шрифтовой" },
    prompt: "a typographic wordmark logo: the brand name itself is the logo, custom elegant lettering with one subtle distinctive detail, no separate icon" },
  { id: "lettermark", label: { en: "Monogram", ru: "Монограмма" },
    prompt: "a monogram logo built from the initials of the brand name, interlocking letters inside a simple shape, the full name in small type below" },
  { id: "emblem", label: { en: "Emblem / badge", ru: "Эмблема / значок" },
    prompt: "an emblem badge logo: the name inside a circular or shield-shaped badge with a small central symbol, balanced and symmetrical" },
  { id: "mascot", label: { en: "Mascot", ru: "Маскот" },
    prompt: "a friendly mascot logo: a simple bold cartoon character that fits the business, with the name in rounded bold type below" },
  { id: "gradient", label: { en: "Modern gradient", ru: "Градиент" },
    prompt: "a modern tech logo: a smooth abstract symbol with a vibrant gradient, sleek sans-serif wordmark, app-icon friendly" },
  { id: "line", label: { en: "Line art", ru: "Линейный" },
    prompt: "a fine line-art logo: a single continuous thin outline symbol, delicate serif or light sans wordmark, elegant and airy" },
  { id: "vintage", label: { en: "Vintage", ru: "Винтаж" },
    prompt: "a vintage retro logo: hand-crafted badge with classic serif lettering, small ornaments and an 'EST.' line, muted heritage colors" },
  { id: "luxury", label: { en: "Luxury", ru: "Премиум" },
    prompt: "a luxury logo: refined thin serif wordmark with generous letter spacing, a small elegant symbol, gold on deep dark color" },
  { id: "playful", label: { en: "Playful", ru: "Игривый" },
    prompt: "a playful logo: bouncy hand-drawn rounded letters, bright cheerful colors, a small fun symbol" },
];

export const BACKGROUNDS = [
  { id: "white", label: { en: "White", ru: "Белый" }, prompt: "on a plain pure white background" },
  { id: "dark", label: { en: "Dark", ru: "Тёмный" }, prompt: "on a plain solid dark charcoal background" },
  { id: "brand", label: { en: "Brand color", ru: "Цвет бренда" }, prompt: "on a plain solid background in the main brand color, logo in contrasting color" },
];

export const ASPECTS = ["1:1", "4:3", "16:9", "3:4"];
export const RESOLUTIONS = ["1k", "2k"];

export const APP = {
  id: "logo-studio",
  name: "Logo Studio",
  theme: "slate-indigo",
  tagline: { en: "AI logo maker", ru: "Логотипы с ИИ" },
  kicker: { en: "Brand identity in a minute", ru: "Айдентика за минуту" },
  headline: { en: "A logo for your brand from its name", ru: "Логотип для бренда по его названию" },
  description: {
    en: "Enter the brand name, tell what you do, pick a style — get logo concepts with a readable name. Add a sketch to have it redrawn cleanly.",
    ru: "Введите название, расскажите, чем занимаетесь, выберите стиль — получите варианты логотипа с читаемым названием. Добавьте набросок — его перерисуют начисто.",
  },
  cta: { en: "Create logo", ru: "Создать логотип" },
  models: Object.values(MODELS),
  upload: { types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 20 * 1024 * 1024 },
  slots: [{
    key: "sketch", kind: "image", min: 0, max: 1,
    label: { en: "Sketch or old logo (optional)", ru: "Набросок или старый логотип (необязательно)" },
    hint: { en: "A photo of a hand sketch or your current logo — the shape will be kept and redrawn.", ru: "Фото наброска от руки или текущего логотипа — форма сохранится и будет перерисована." },
  }],
  counts: [1, 2, 4],
  compare: false,
  initialState: () => ({ brand: "", slogan: "", about: "", colors: "", style: "minimal", bg: "white", aspect: "1:1", resolution: "1k", count: 2 }),
  check: (s) => (s.brand.trim() ? null : { en: "Enter the brand name.", ru: "Введите название бренда." }),
  priceModel: () => MODELS.create,
  label: (s) => s.brand.trim(),
};
