"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

const FEATURE_KEYS = [
  { titleKey: "quantumTitle", descKey: "quantumDesc", icon: "Q" },
  { titleKey: "agiTitle", descKey: "agiDesc", icon: "A" },
  { titleKey: "neuralTitle", descKey: "neuralDesc", icon: "N" },
  { titleKey: "infiniteTitle", descKey: "infiniteDesc", icon: "\u221E" },
  { titleKey: "zeroTitle", descKey: "zeroDesc", icon: "0" },
  { titleKey: "blockchainTitle", descKey: "blockchainDesc", icon: "B" },
] as const;

const PRICING_TIER_KEYS = [
  {
    nameKey: "free" as const,
    price: "$0",
    period: "/mo",
    statusKey: "waitlisted" as const,
    featureKeys: ["freeFeature1", "freeFeature2", "freeFeature3", "freeFeature4"] as const,
    footnoteKey: "freeFootnote" as const,
  },
  {
    nameKey: "pro" as const,
    price: "$99",
    period: "/mo",
    statusKey: "waitlistedPriority" as const,
    featureKeys: ["proFeature1", "proFeature2", "proFeature3", "proFeature4", "proFeature5"] as const,
    highlighted: true,
  },
  {
    nameKey: "enterprise" as const,
    price: "",
    period: "",
    statusKey: "waitlistedVip" as const,
    featureKeys: ["enterpriseFeature1", "enterpriseFeature2", "enterpriseFeature3", "enterpriseFeature4", "enterpriseFeature5"] as const,
  },
] as const;

const QUEUE_MSG_KEYS = [
  "msg1", "msg2", "msg3", "msg4", "msg5",
  "msg6", "msg7", "msg8", "msg9", "msg10",
] as const;

const CAPTCHA_KEYS = [
  { questionKey: "question1" as const, explanationKey: "explanation1" as const, type: "grid" as const },
  { questionKey: "question2" as const, explanationKey: "explanation2" as const, type: "text" as const },
  { questionKey: "question3" as const, explanationKey: "explanation3" as const, type: "boolean" as const },
] as const;

const REJECTION_METRIC_KEYS = [
  { labelKey: "metric1" as const, value: 3.7, max: 100, unit: "%" },
  { labelKey: "metric2" as const, value: 12, max: 100, unit: " pts" },
  { labelKey: "metric3" as const, value: 0.02, max: 10, unit: "/10" },
  { labelKey: "metric4" as const, value: 7, max: 100, unit: "%" },
  { labelKey: "metric5" as const, value: 94.3, max: 100, unit: "%", inverted: true },
] as const;

const WAIT_TIME_KEYS = [
  "waitTime1", "waitTime2", "waitTime3", "waitTime4",
  "waitTime5", "waitTime6", "waitTime7", "waitTime8",
] as const;

const INVITE_ERROR_KEYS = [
  "error1", "error2", "error3", "error4", "error5", "error6",
] as const;

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Stage =
  | "landing"
  | "invite"
  | "captcha"
  | "queue"
  | "rejection"
  | "easter-egg";

export default function WaitlistApp() {
  const tNav = useTranslations("Nav");
  const tHero = useTranslations("Hero");
  const tFeatures = useTranslations("Features");
  const tPricing = useTranslations("Pricing");
  const tLeaderboardCTA = useTranslations("LeaderboardCTA");
  const tFooter = useTranslations("Footer");
  const tInvite = useTranslations("Invite");
  const tCaptcha = useTranslations("Captcha");
  const tQueue = useTranslations("Queue");
  const tRejection = useTranslations("Rejection");
  const tEasterEgg = useTranslations("EasterEgg");

  const [stage, setStage] = useState<Stage>("landing");
  const [modalVisible, setModalVisible] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteAttempts, setInviteAttempts] = useState(0);
  const [inviteError, setInviteError] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [captchaIndex, setCaptchaIndex] = useState(0);
  const [captchaGridSelected, setCaptchaGridSelected] = useState<Set<number>>(
    new Set()
  );
  const [captchaTextInput, setCaptchaTextInput] = useState("");
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [captchaFailMessage, setCaptchaFailMessage] = useState("");

  const [queuePosition, setQueuePosition] = useState(10245);
  const [queueLogs, setQueueLogs] = useState<string[]>([]);
  const [waitTimeIndex, setWaitTimeIndex] = useState(0);

  const [timeSpent, setTimeSpent] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [socialCount, setSocialCount] = useState(1247893);
  const [shakeInvite, setShakeInvite] = useState(false);

  const konamiBuffer = useRef<string[]>([]);
  const queueLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      konamiBuffer.current.push(e.key);
      if (konamiBuffer.current.length > KONAMI_CODE.length) {
        konamiBuffer.current.shift();
      }
      if (
        JSON.stringify(konamiBuffer.current) === JSON.stringify(KONAMI_CODE)
      ) {
        setShowEasterEgg(true);
        setStage("easter-egg");
        setModalVisible(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (stage !== "queue") return;

    const posInterval = setInterval(
      () => {
        const increase = Math.floor(Math.random() * 8) + 1;
        setQueuePosition((p) => p + increase);
        const msgKey =
          QUEUE_MSG_KEYS[Math.floor(Math.random() * QUEUE_MSG_KEYS.length)];
        setQueueLogs((logs) => [
          ...logs.slice(-19),
          `[${new Date().toLocaleTimeString()}] ${tQueue(msgKey)}`,
        ]);
      },
      3000 + Math.random() * 2000
    );

    const waitInterval = setInterval(() => {
      setWaitTimeIndex((i) => Math.min(i + 1, WAIT_TIME_KEYS.length - 1));
    }, 8000);

    return () => {
      clearInterval(posInterval);
      clearInterval(waitInterval);
    };
  }, [stage, tQueue]);

  useEffect(() => {
    if (queueLogRef.current) {
      queueLogRef.current.scrollTop = queueLogRef.current.scrollHeight;
    }
  }, [queueLogs]);

  const handleJoinWaitlist = useCallback(() => {
    setStage("invite");
    setModalVisible(true);
    setInviteCode("");
    setInviteAttempts(0);
    setInviteError("");
    setShowRequestForm(false);
  }, []);

  const handleInviteSubmit = useCallback(() => {
    if (!inviteCode.trim()) {
      setInviteError(tInvite("emptyError"));
      setShakeInvite(true);
      setTimeout(() => setShakeInvite(false), 500);
      return;
    }

    setInviteLoading(true);
    setTimeout(() => {
      setInviteLoading(false);
      const newAttempts = inviteAttempts + 1;
      setInviteAttempts(newAttempts);

      if (inviteCode.toLowerCase() === "null") {
        setShowEasterEgg(true);
        setStage("easter-egg");
        return;
      }

      const errorKey = INVITE_ERROR_KEYS[newAttempts % INVITE_ERROR_KEYS.length];
      setInviteError(tInvite(errorKey, { code: inviteCode }));
      setShakeInvite(true);
      setTimeout(() => setShakeInvite(false), 500);

      if (newAttempts >= 3) {
        setShowRequestForm(true);
      }
    }, 1500);
  }, [inviteCode, inviteAttempts, tInvite]);

  const handleAlternativeVerification = useCallback(() => {
    setStage("captcha");
    setCaptchaIndex(0);
    setCaptchaGridSelected(new Set());
    setCaptchaTextInput("");
    setCaptchaFailed(false);
  }, []);

  const handleCaptchaSubmit = useCallback(() => {
    const current = CAPTCHA_KEYS[captchaIndex];
    setCaptchaFailed(true);
    setCaptchaFailMessage(tCaptcha(current.explanationKey));

    setTimeout(() => {
      if (captchaIndex < CAPTCHA_KEYS.length - 1) {
        setCaptchaIndex((i) => i + 1);
        setCaptchaGridSelected(new Set());
        setCaptchaTextInput("");
        setCaptchaFailed(false);
        setCaptchaFailMessage("");
      } else {
        setStage("queue");
        setQueuePosition(10245);
        setQueueLogs([
          `[${new Date().toLocaleTimeString()}] ${tQueue("welcome")}`,
        ]);
        setWaitTimeIndex(0);
      }
    }, 2500);
  }, [captchaIndex, tCaptcha, tQueue]);

  const handleViewRejection = useCallback(() => {
    setStage("rejection");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setStage("landing");
      setShowEasterEgg(false);
    }, 300);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold gradient-text tracking-tight">
              WaitlistAI
            </span>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
              <button className="hover:text-white transition-colors cursor-not-allowed">
                {tNav("product")}
              </button>
              <button className="hover:text-white transition-colors cursor-not-allowed">
                {tNav("research")}
              </button>
              <button className="hover:text-white transition-colors cursor-not-allowed">
                {tNav("safety")}
              </button>
              <Link href="/leaderboard" className="hover:text-white transition-colors">
                {tNav("leaderboard")}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="text-xs text-zinc-600 font-mono hidden sm:block">
              v0.{process.env.NEXT_PUBLIC_GIT_COMMIT_COUNT || "0"}.
              {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
            </span>
            <button
              onClick={handleJoinWaitlist}
              className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              {tNav("signIn")}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 text-center">
        <div className="animate-slide-up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            {tHero("badge")}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="gradient-text">WaitlistAI</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-2 max-w-2xl mx-auto">
            {tHero("tagline")}
          </p>
          <p className="text-base text-zinc-600 mb-10 max-w-xl mx-auto font-mono">
            {tHero("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleJoinWaitlist}
              className="glow-button px-8 py-4 text-lg font-semibold text-white rounded-xl cursor-pointer"
            >
              {tHero("joinWaitlist")}
            </button>
            <button className="px-8 py-4 text-lg text-zinc-400 border border-white/10 rounded-xl hover:bg-white/5 transition-all cursor-not-allowed">
              {tHero("readPaper")}
            </button>
          </div>

          <p className="text-sm text-zinc-600">
            <span className="text-zinc-400 font-mono tabular-nums">
              {socialCount.toLocaleString()}
            </span>{" "}
            {tHero("socialProof")}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {tFeatures("heading")}{" "}
          <span className="gradient-text">{tFeatures("headingHighlight")}</span>
        </h2>
        <p className="text-zinc-500 text-center mb-16 max-w-2xl mx-auto">
          {tFeatures("subheading")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_KEYS.map((feature) => (
            <div
              key={feature.titleKey}
              className="glass-card glass-card-hover p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg font-mono gradient-text mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {tFeatures(feature.titleKey)}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {tFeatures(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {tPricing("heading")}{" "}
          <span className="gradient-text">{tPricing("headingHighlight")}</span>{" "}
          {tPricing("headingSuffix")}
        </h2>
        <p className="text-zinc-500 text-center mb-16 max-w-lg mx-auto">
          {tPricing("subheading")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_TIER_KEYS.map((tier) => (
            <div
              key={tier.nameKey}
              className={`glass-card p-8 flex flex-col ${
                "highlighted" in tier && tier.highlighted
                  ? "border-purple-500/30 bg-purple-500/5 ring-1 ring-purple-500/20"
                  : ""
              }`}
            >
              {"highlighted" in tier && tier.highlighted && (
                <span className="text-xs font-mono text-purple-400 mb-4 uppercase tracking-wider">
                  {tPricing("mostPopular")}
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">
                {tPricing(tier.nameKey)}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">
                  {tier.price || tPricing("contactSales")}
                </span>
                <span className="text-zinc-500 text-sm">{tier.period}</span>
              </div>
              <span className="inline-block text-xs font-mono px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 w-fit">
                {tPricing(tier.statusKey)}
              </span>
              <ul className="flex-1 space-y-3 mb-8">
                {tier.featureKeys.map((fKey) => (
                  <li
                    key={fKey}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <span className="text-emerald-500 mt-0.5">&#10003;</span>
                    {tPricing(fKey)}
                  </li>
                ))}
              </ul>
              {"footnoteKey" in tier && (
                <p className="text-[10px] text-zinc-700 mb-4">
                  {tPricing(tier.footnoteKey)}
                </p>
              )}
              <button
                onClick={handleJoinWaitlist}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  "highlighted" in tier && tier.highlighted
                    ? "glow-button text-white"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                }`}
              >
                {tPricing("joinWaitlist")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="glass-card p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">
              {tLeaderboardCTA("heading")}
            </span>
          </h2>
          <p className="text-zinc-500 mb-6 max-w-md mx-auto">
            {tLeaderboardCTA("description")}
          </p>
          <Link
            href="/leaderboard"
            className="inline-block px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            {tLeaderboardCTA("viewLeaderboard")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm gradient-text font-bold">WaitlistAI</span>
            <span className="text-xs text-zinc-700">
              {tFooter("copyright", { year: new Date().getFullYear() })}
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              {tFooter("privacy")}
            </span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              {tFooter("terms")}
            </span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              {tFooter("status")}
            </span>
            <a
              href="https://github.com/kuhung"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              {tFooter("github")}
            </a>
          </div>
          <div className="text-[10px] text-zinc-700 font-mono">
            Build {process.env.NEXT_PUBLIC_GIT_HASH || "dev"} |{" "}
            {process.env.NEXT_PUBLIC_BUILD_TIME
              ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleDateString("en-CA")
              : "local"}{" "}
            | {tFooter("wastedTime", { time: formatTime(timeSpent) })}
          </div>
        </div>
      </footer>

      {/* Modal Overlay System */}
      {modalVisible && stage !== "landing" && (
        <div
          className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div
            className="glass-card w-full max-w-lg p-8 animate-slide-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors text-xl cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Stage: Invite Code */}
            {stage === "invite" && (
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {tInvite("title")}
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  {tInvite("description")}
                </p>

                <div className={shakeInvite ? "animate-shake" : ""}>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => {
                      setInviteCode(e.target.value);
                      setInviteError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleInviteSubmit();
                    }}
                    placeholder={tInvite("placeholder")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 font-mono text-center text-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                    disabled={inviteLoading}
                    autoFocus
                  />
                </div>

                {inviteError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-slide-up">
                    {inviteError}
                  </div>
                )}

                <button
                  onClick={handleInviteSubmit}
                  disabled={inviteLoading}
                  className="w-full mt-4 py-3 rounded-lg glow-button text-white font-medium disabled:opacity-50 cursor-pointer"
                >
                  {inviteLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {tInvite("verifying", {
                        count: Math.floor(Math.random() * 47) + 3,
                      })}
                    </span>
                  ) : (
                    tInvite("verifyButton")
                  )}
                </button>

                <div className="mt-6 pt-4 border-t border-white/5">
                  {!showRequestForm ? (
                    <button
                      onClick={() => setShowRequestForm(true)}
                      className="text-sm text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      {tInvite("noCode")}
                    </button>
                  ) : (
                    <div className="animate-slide-up">
                      <p className="text-sm text-zinc-500 mb-3">
                        {tInvite("requestPrompt")}
                      </p>
                      <input
                        type="text"
                        placeholder={tInvite("requestPlaceholder")}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                        disabled
                      />
                      <p className="mt-2 text-xs text-zinc-700">
                        {tInvite("requestParadox")}{" "}
                        <span className="text-zinc-600">
                          {tInvite("requestParadoxSuffix")}
                        </span>
                      </p>

                      {inviteAttempts >= 3 && (
                        <button
                          onClick={handleAlternativeVerification}
                          className="mt-4 w-full py-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all cursor-pointer"
                        >
                          {tInvite("altVerification")}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stage: CAPTCHA */}
            {stage === "captcha" && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {tCaptcha("identityVerification")}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {tCaptcha("step", {
                      current: captchaIndex + 1,
                      total: CAPTCHA_KEYS.length,
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-6">
                  {tCaptcha(CAPTCHA_KEYS[captchaIndex].questionKey)}
                </h3>

                {/* Grid CAPTCHA */}
                {CAPTCHA_KEYS[captchaIndex].type === "grid" && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const next = new Set(captchaGridSelected);
                          if (next.has(i)) next.delete(i);
                          else next.add(i);
                          setCaptchaGridSelected(next);
                        }}
                        className={`aspect-square rounded-lg border relative overflow-hidden cursor-pointer transition-all ${
                          captchaGridSelected.has(i)
                            ? "border-cyan-500 bg-cyan-500/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-full h-full"
                            style={{
                              background: `linear-gradient(${i * 40}deg, 
                                hsl(${i * 40}, 30%, 15%), 
                                hsl(${i * 40 + 60}, 20%, 10%))`,
                            }}
                          />
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40Z' fill='none' stroke='%23fff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                              backgroundSize: `${12 + i * 3}px`,
                            }}
                          />
                        </div>
                        {captchaGridSelected.has(i) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/20">
                            <span className="text-2xl text-cyan-400">
                              &#10003;
                            </span>
                          </div>
                        )}
                        <div className="scan-line" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Text CAPTCHA */}
                {CAPTCHA_KEYS[captchaIndex].type === "text" && (
                  <div className="mb-4">
                    <textarea
                      value={captchaTextInput}
                      onChange={(e) => setCaptchaTextInput(e.target.value)}
                      placeholder={tCaptcha("textPlaceholder")}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-all resize-none h-24"
                    />
                    <p className="text-[10px] text-zinc-700 mt-1">
                      {tCaptcha("textDisclaimer")}
                    </p>
                  </div>
                )}

                {/* Boolean CAPTCHA */}
                {CAPTCHA_KEYS[captchaIndex].type === "boolean" && (
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={handleCaptchaSubmit}
                      className="flex-1 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all cursor-pointer"
                    >
                      {tCaptcha("true")}
                    </button>
                    <button
                      onClick={handleCaptchaSubmit}
                      className="flex-1 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all cursor-pointer"
                    >
                      {tCaptcha("false")}
                    </button>
                  </div>
                )}

                {captchaFailed && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-slide-up">
                    {captchaFailMessage}
                  </div>
                )}

                {CAPTCHA_KEYS[captchaIndex].type !== "boolean" && (
                  <button
                    onClick={handleCaptchaSubmit}
                    className="w-full py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium hover:bg-cyan-500/20 transition-all cursor-pointer"
                  >
                    {tCaptcha("submit")}
                  </button>
                )}
              </div>
            )}

            {/* Stage: Queue */}
            {stage === "queue" && (
              <div>
                <div className="text-center mb-6">
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-2">
                    {tQueue("position")}
                  </p>
                  <div className="text-5xl md:text-6xl font-bold font-mono gradient-text-warm animate-count-up">
                    #{queuePosition.toLocaleString()}
                  </div>
                  <p className="text-sm text-zinc-600 mt-2">
                    {tQueue("estimatedWait")}{" "}
                    <span className="text-amber-400 font-mono">
                      {tQueue(WAIT_TIME_KEYS[waitTimeIndex])}
                    </span>
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-zinc-600 mb-1">
                    <span>{tQueue("progress")}</span>
                    <span>
                      {Math.max(
                        0,
                        100 - (queuePosition - 10245) * 0.5
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 progress-bar-regress"
                      style={{
                        width: `${Math.max(0, 100 - (queuePosition - 10245) * 0.5)}%`,
                      }}
                    />
                  </div>
                </div>

                <div
                  ref={queueLogRef}
                  className="queue-log h-40 overflow-y-auto rounded-lg bg-black/50 border border-white/5 p-3 font-mono text-[11px] text-zinc-500 space-y-1"
                >
                  {queueLogs.map((log, i) => (
                    <div key={i} className={i === queueLogs.length - 1 ? "text-amber-400/80" : ""}>
                      {log}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleViewRejection}
                  className="w-full mt-4 py-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  {tQueue("viewAnalysis")}
                </button>
              </div>
            )}

            {/* Stage: Rejection Report */}
            {stage === "rejection" && (
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {tRejection("title")}
                </h3>
                <p className="text-xs text-zinc-600 font-mono mb-6">
                  {tRejection("reportId", {
                    id: Math.random().toString(36).substring(2, 10).toUpperCase(),
                    time: new Date().toLocaleTimeString(),
                  })}
                </p>

                <div className="space-y-4 mb-6">
                  {REJECTION_METRIC_KEYS.map((metric) => (
                    <div key={metric.labelKey}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">
                          {tRejection(metric.labelKey)}
                        </span>
                        <span
                          className={`font-mono ${
                            "inverted" in metric && metric.inverted
                              ? "text-amber-400"
                              : "text-red-400"
                          }`}
                        >
                          {metric.value}
                          {metric.unit}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            "inverted" in metric && metric.inverted
                              ? "bg-gradient-to-r from-amber-500 to-red-500"
                              : "bg-gradient-to-r from-red-600 to-red-400"
                          }`}
                          style={{
                            width: `${(metric.value / metric.max) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 mb-4">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    {tRejection("recommendation")}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {tRejection("recommendationText")}{" "}
                    <span className="text-zinc-400 font-mono">
                      {tRejection("businessEternities")}
                    </span>
                    .
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStage("queue")}
                    className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-sm hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {tRejection("backToQueue")}
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 rounded-lg glow-button text-white text-sm cursor-pointer"
                  >
                    {tRejection("acceptFate")}
                  </button>
                </div>
              </div>
            )}

            {/* Stage: Easter Egg */}
            {stage === "easter-egg" && (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">&#127881;</div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  {tEasterEgg("congratulations")}
                </h3>
                <p className="text-zinc-400 mb-4">
                  {tEasterEgg("unlocked")}
                </p>
                <div className="inline-block px-6 py-3 rounded-lg bg-white/5 border border-white/10 font-mono text-2xl text-zinc-500 mb-6">
                  {tEasterEgg("inviteCode")} <span className="text-white">NULL</span>
                </div>
                <p className="text-sm text-zinc-600 mb-8">
                  {tEasterEgg("touchGrass")}
                  <br />
                  {tEasterEgg("realAgi")}
                </p>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-lg glow-button text-white cursor-pointer"
                >
                  {tEasterEgg("returnToReality")}
                </button>
                <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: [
                          "#8b5cf6",
                          "#3b82f6",
                          "#06b6d4",
                          "#f97316",
                          "#ef4444",
                          "#22c55e",
                        ][i % 6],
                        animation: `confetti-fall ${2 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
