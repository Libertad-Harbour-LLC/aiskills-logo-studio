"use client";

import { STYLES, BACKGROUNDS, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { useLang } from "@/lib/i18n";
import { PresetGrid, LabeledChips, TextField } from "./Fields";

export default function Options({ state, set, Chips }) {
  const { t } = useLang();
  return (
    <>
      <TextField id="brand" required label={{ en: "Brand name", ru: "Название бренда" }} value={state.brand} max={40}
        placeholder={{ en: "e.g. Northwind Coffee", ru: "например: Северный кофе" }} onChange={(v) => set({ brand: v })} />
      <TextField id="slogan" label={{ en: "Tagline (optional)", ru: "Слоган (необязательно)" }} value={state.slogan} max={60}
        placeholder={{ en: "e.g. Roasted daily", ru: "например: Обжариваем каждый день" }} onChange={(v) => set({ slogan: v })} />
      <TextField id="about" rows={2} label={{ en: "What the business does", ru: "Чем занимается бизнес" }} value={state.about} max={300}
        placeholder={{ en: "e.g. a small specialty coffee shop, cozy and eco-friendly", ru: "например: небольшая кофейня, уютная, эко" }}
        onChange={(v) => set({ about: v })} />
      <PresetGrid label={{ en: "Style", ru: "Стиль" }} items={STYLES} value={state.style} onChange={(v) => set({ style: v })} />
      <TextField id="colors" label={{ en: "Colors (optional)", ru: "Цвета (необязательно)" }} value={state.colors} max={80}
        placeholder={{ en: "e.g. deep green and cream", ru: "например: тёмно-зелёный и кремовый" }} onChange={(v) => set({ colors: v })} />
      <LabeledChips label={{ en: "Background", ru: "Фон" }} items={BACKGROUNDS} value={state.bg} onChange={(v) => set({ bg: v })} />
      <Chips label={t("aspect")} options={ASPECTS} value={state.aspect} onChange={(v) => set({ aspect: v })} />
      <Chips label={t("resolution")} options={RESOLUTIONS} value={state.resolution} onChange={(v) => set({ resolution: v })} render={(v) => v.toUpperCase()} />
    </>
  );
}
