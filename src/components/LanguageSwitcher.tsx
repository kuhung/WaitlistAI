"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: string) {
    if (nextLocale === locale) return;

    startTransition(() => {
      const segments = pathname.split("/");
      if (routing.locales.includes(segments[1] as typeof routing.locales[number])) {
        segments[1] = nextLocale;
      } else {
        segments.splice(1, 0, nextLocale);
      }
      router.replace(segments.join("/") || "/");
    });
  }

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={isPending}
          className={`px-2 py-1 rounded transition-all cursor-pointer ${
            locale === loc
              ? "bg-white/10 text-white border border-white/20"
              : "text-zinc-500 hover:text-zinc-300 border border-transparent"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
