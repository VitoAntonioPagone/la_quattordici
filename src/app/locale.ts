import { headers } from "next/headers";
import type { Lang } from "./i18n";

function normalizeLang(value?: string | null): Lang | null {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower.startsWith("it")) return "it";
  if (lower.startsWith("en")) return "en";
  return null;
}

export async function resolveLang(raw?: string): Promise<Lang> {
  const explicit = normalizeLang(raw);
  if (explicit) return explicit;

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");

  if (acceptLanguage) {
    for (const part of acceptLanguage.split(",")) {
      const candidate = normalizeLang(part.trim().split(";")[0]);
      if (candidate) return candidate;
    }
  }

  return "it";
}
