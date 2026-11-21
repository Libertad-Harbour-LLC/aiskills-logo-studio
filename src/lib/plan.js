import "server-only";
import { MODELS, STYLES, BACKGROUNDS, ASPECTS, RESOLUTIONS } from "@/lib/app.config";
import { PlanError, pick, urls, text } from "@/lib/plan-helpers";

// Text that goes inside quotes in the prompt: no quotes of its own.
const q = (v, max) => text(v, max).replace(/["“”«»]/g, "'");

export function plan(body) {
  const brand = q(body.brand, 40);
  if (!brand) throw new PlanError("Enter the brand name", "missing_field");
  const slogan = q(body.slogan, 60);
  const about = text(body.about, 300);
  const colors = text(body.colors, 80);
  const style = STYLES.find((s) => s.id === body.style) || STYLES[0];
  const bg = BACKGROUNDS.find((b) => b.id === body.bg) || BACKGROUNDS[0];
  const sketch = urls(body.inputs, "sketch", { min: 0, max: 1 });
  const count = pick(Number(body.count), [1, 2, 4], 1);
  const prompt =
    (sketch.length
      ? `Redraw the sketch / logo in the reference image as a clean, professional, finished logo, keeping its main shape and idea: ${style.prompt}. `
      : `Design ${style.prompt}. `) +
    `Brand name, spelled exactly: "${brand}".` +
    (slogan ? ` Small tagline under the name, spelled exactly: "${slogan}".` : " No other text.") +
    (about ? ` The business: ${about}.` : "") +
    (colors ? ` Colors: ${colors}.` : "") +
    ` The logo is centered ${bg.prompt}, crisp vector look, flat shapes, sharp edges, high contrast, ` +
    "no mockup, no photo, no extra words, no watermark, correct spelling of every letter.";
  const job = {
    model: sketch.length ? MODELS.fromSketch : MODELS.create,
    prompt,
    params: { aspect_ratio: pick(body.aspect, ASPECTS, "1:1"), resolution: pick(body.resolution, RESOLUTIONS, "1k") },
    fields: { output_format: "png" },
    ...(sketch.length ? { inputs: { image_urls: sketch } } : {}),
  };
  return Array.from({ length: count }, () => job);
}
