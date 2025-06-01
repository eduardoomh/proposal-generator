
export function getLanguageLabel(lang: "es" | "en"): string {
  return lang === "es" ? "Spanish" : "English";
}

// utils/delay.ts
export function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}