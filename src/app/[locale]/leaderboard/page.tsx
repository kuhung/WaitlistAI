"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface LeaderboardEntry {
  rank: number;
  name: string;
  timeWasted: number;
  failedAttempts: number;
  queueRegression: number;
  region: string;
}

const FAKE_NAMES = [
  "anon_dev_42", "gpt_refugee", "waiting4agi", "prompt_lord",
  "tokenizer_9000", "neural_nomad", "gradient_ghost", "epoch_wanderer",
  "loss_function_larry", "backprop_bob", "attention_head_7",
  "transformer_tourist", "cuda_cowboy", "tensor_nomad", "softmax_sally",
  "dropout_dave", "batch_norm_betty", "relu_rick", "embeddings_earl",
  "fine_tune_frank", "zero_shot_zoe", "few_shot_fred",
  "chain_of_thought_chad", "rlhf_rachel", "hallucination_harry",
  "context_window_carol", "token_limit_tim", "api_key_expired_alice",
  "rate_limit_randy", "model_collapsed_mike",
];

const REGIONS = [
  "SF Bay Area", "London", "Bangalore", "Berlin", "Tokyo",
  "Shanghai", "Tel Aviv", "Singapore", "Toronto", "Seoul",
  "Sydney", "Sao Paulo", "Stockholm", "Shenzhen", "Amsterdam",
];

function generateEntries(): LeaderboardEntry[] {
  return Array.from({ length: 30 }, (_, i) => ({
    rank: i + 1,
    name: FAKE_NAMES[i % FAKE_NAMES.length] + (i >= FAKE_NAMES.length ? `_${i}` : ""),
    timeWasted: Math.floor(Math.random() * 86400) + 3600,
    failedAttempts: Math.floor(Math.random() * 500) + 10,
    queueRegression: Math.floor(Math.random() * 50000) + 1000,
    region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
  })).sort((a, b) => b.timeWasted - a.timeWasted);
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function LeaderboardPage() {
  const t = useTranslations("Leaderboard");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [sortBy, setSortBy] = useState<"time" | "attempts" | "regression">(
    "time"
  );

  useEffect(() => {
    setEntries(generateEntries());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) =>
        prev.map((entry) => ({
          ...entry,
          timeWasted: entry.timeWasted + Math.floor(Math.random() * 30) + 1,
          failedAttempts:
            entry.failedAttempts + (Math.random() > 0.7 ? 1 : 0),
          queueRegression:
            entry.queueRegression + Math.floor(Math.random() * 10),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sorted = [...entries].sort((a, b) => {
    if (sortBy === "time") return b.timeWasted - a.timeWasted;
    if (sortBy === "attempts") return b.failedAttempts - a.failedAttempts;
    return b.queueRegression - a.queueRegression;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[128px] animate-float-delayed" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text tracking-tight">
            WaitlistAI
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="text-xs text-zinc-600 font-mono">
              Build {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
            </span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("title")}</span>
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          {[
            { key: "time" as const, labelKey: "sortTime" as const },
            { key: "attempts" as const, labelKey: "sortAttempts" as const },
            { key: "regression" as const, labelKey: "sortRegression" as const },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSortBy(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                sortBy === tab.key
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "bg-white/5 text-zinc-500 border border-white/5 hover:bg-white/10"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="px-6 py-4 text-left">{t("colRank")}</th>
                  <th className="px-6 py-4 text-left">{t("colUser")}</th>
                  <th className="px-6 py-4 text-left">{t("colRegion")}</th>
                  <th className="px-6 py-4 text-right">{t("colTime")}</th>
                  <th className="px-6 py-4 text-right">{t("colAttempts")}</th>
                  <th className="px-6 py-4 text-right">{t("colRegression")}</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, i) => (
                  <tr
                    key={entry.name}
                    className="border-b border-white/3 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-sm">
                      {i < 3 ? (
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            i === 0
                              ? "bg-amber-500/20 text-amber-400"
                              : i === 1
                                ? "bg-zinc-400/20 text-zinc-300"
                                : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {i + 1}
                        </span>
                      ) : (
                        <span className="text-zinc-600">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-zinc-300">
                        {entry.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {entry.region}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-zinc-400">
                      {formatDuration(entry.timeWasted)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-red-400/80">
                      {entry.failedAttempts.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-amber-400/80">
                      +{entry.queueRegression.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              labelKey: "totalTime" as const,
              value: `${Math.floor(entries.reduce((a, b) => a + b.timeWasted, 0) / 3600).toLocaleString()}h`,
            },
            {
              labelKey: "totalAttempts" as const,
              value: entries
                .reduce((a, b) => a + b.failedAttempts, 0)
                .toLocaleString(),
            },
            {
              labelKey: "avgRegression" as const,
              value: `+${Math.floor(entries.reduce((a, b) => a + b.queueRegression, 0) / Math.max(entries.length, 1)).toLocaleString()}`,
            },
          ].map((stat) => (
            <div key={stat.labelKey} className="glass-card p-6 text-center">
              <p className="text-2xl font-bold font-mono gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-600">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg glow-button text-white font-medium"
          >
            {t("backToWaiting")}
          </Link>
        </div>
      </div>
    </div>
  );
}
