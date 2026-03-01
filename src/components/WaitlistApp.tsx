"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

// ============================================================
// Constants
// ============================================================

const FEATURES = [
  {
    title: "Quantum-Aligned Processing",
    desc: "Queries processed across parallel universes simultaneously. Results may vary by timeline.",
    icon: "Q",
  },
  {
    title: "AGI-Ready Architecture",
    desc: "Built for AGI compatibility once someone figures out what that actually means.",
    icon: "A",
  },
  {
    title: "Neural Pathway Optimization",
    desc: "We optimize your neural pathways. Yours, not the model's. Side effects may include existential dread.",
    icon: "N",
  },
  {
    title: "Infinite Context Window",
    desc: "Our context window contains the entire history of the universe. We just can't access most of it.",
    icon: "\u221E",
  },
  {
    title: "Zero-Latency Hallucinations",
    desc: "Industry-leading hallucination speed. Wrong answers delivered faster than ever before.",
    icon: "0",
  },
  {
    title: "Blockchain-Verified Tokens",
    desc: "Every token is verified on our proprietary blockchain. We're not sure why, but investors love it.",
    icon: "B",
  },
];

const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    status: "Waitlisted",
    features: [
      "Access to the waitlist",
      "Priority waiting position*",
      "Weekly queue updates",
      "Community waiting room",
    ],
    footnote: "*Priority is relative to non-existent users",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    status: "Waitlisted (Priority)",
    features: [
      "Everything in Free",
      "Premium waiting position",
      "Real-time queue regression",
      "Personalized rejection reports",
      "24/7 waiting support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact Sales",
    period: "",
    status: "Waitlisted (VIP)",
    features: [
      "Everything in Pro",
      "Dedicated waiting manager",
      "Custom rejection branding",
      "SLA: guaranteed wait time > 99.9%",
      "Invoice-based waiting",
    ],
  },
];

const QUEUE_MESSAGES = [
  "A Tier-3 Quantum Subscriber has been prioritized above you.",
  "The algorithm has recalibrated your position based on cosmic alignment.",
  "A new batch of priority users has been inserted ahead of your position.",
  "Your ranking has been temporarily adjusted due to server optimization.",
  "An Enterprise VIP customer has entered the queue. Your position has shifted.",
  "Our AI determined you can wait a little longer. Adjusting queue...",
  "System maintenance complete. Queue positions have been... rearranged.",
  "A blockchain verification event has reorganized the queue order.",
  "Someone with more Twitter followers has been given priority access.",
  "Your patience score has been noted. Queue position adjusted accordingly.",
];

const CAPTCHA_QUESTIONS = [
  {
    question: "Select all squares containing AGI",
    type: "grid" as const,
    explanation:
      "Verification failed. No images contained AGI. AGI does not exist yet.",
  },
  {
    question: "Prove you are not an AI pretending to be human",
    type: "text" as const,
    explanation:
      "Analysis complete. An AI would say exactly that. Verification inconclusive.",
  },
  {
    question: "Solve this paradox: 'This statement is false'",
    type: "boolean" as const,
    explanation:
      "Both answers are incorrect. This is by design. Welcome to AI ethics.",
  },
];

const REJECTION_METRICS = [
  { label: "AI Compatibility Index", value: 3.7, max: 100, unit: "%" },
  {
    label: "Prompt Engineering Quotient",
    value: 12,
    max: 100,
    unit: " pts",
  },
  { label: "Compute Worthiness Score", value: 0.02, max: 10, unit: "/10" },
  { label: "Vibe Alignment Factor", value: 7, max: 100, unit: "%" },
  {
    label: "Hype Susceptibility Index",
    value: 94.3,
    max: 100,
    unit: "%",
    inverted: true,
  },
];

const WAIT_TIME_STAGES = [
  "3 hours",
  "2 days",
  "3 weeks",
  "6 months",
  "2 years",
  "1 decade",
  "1 geological epoch",
  "\u221E",
];

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// ============================================================
// Types
// ============================================================

type Stage =
  | "landing"
  | "invite"
  | "captcha"
  | "queue"
  | "rejection"
  | "easter-egg";

// ============================================================
// Component
// ============================================================

export default function WaitlistApp() {
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

  // --- Time Tracking ---
  useEffect(() => {
    const interval = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Social Proof Counter ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // --- Konami Code ---
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

  // --- Queue Regression ---
  useEffect(() => {
    if (stage !== "queue") return;

    const posInterval = setInterval(
      () => {
        const increase = Math.floor(Math.random() * 8) + 1;
        setQueuePosition((p) => p + increase);
        const msg =
          QUEUE_MESSAGES[Math.floor(Math.random() * QUEUE_MESSAGES.length)];
        setQueueLogs((logs) => [
          ...logs.slice(-19),
          `[${new Date().toLocaleTimeString()}] ${msg}`,
        ]);
      },
      3000 + Math.random() * 2000
    );

    const waitInterval = setInterval(() => {
      setWaitTimeIndex((i) => Math.min(i + 1, WAIT_TIME_STAGES.length - 1));
    }, 8000);

    return () => {
      clearInterval(posInterval);
      clearInterval(waitInterval);
    };
  }, [stage]);

  // --- Auto scroll queue logs ---
  useEffect(() => {
    if (queueLogRef.current) {
      queueLogRef.current.scrollTop = queueLogRef.current.scrollHeight;
    }
  }, [queueLogs]);

  // --- Handlers ---

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
      setInviteError("Invite code cannot be empty. Obviously.");
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

      const errors = [
        `Invite code "${inviteCode}" has expired. It was valid for 0.003 seconds on March 14, 2025.`,
        `This invite code belongs to a parallel universe. It is not valid in this timeline.`,
        `Error 418: I'm a teapot. Also, this invite code is invalid.`,
        `Invite code recognized, but your browser's User-Agent suggests insufficient enthusiasm.`,
        `This code was revoked after the holder used it to generate a meme. Violation of ToS Section 42.`,
        `Our quantum verification detected this code in a superposition of valid and invalid. It collapsed to invalid.`,
      ];

      setInviteError(errors[newAttempts % errors.length]);
      setShakeInvite(true);
      setTimeout(() => setShakeInvite(false), 500);

      if (newAttempts >= 3) {
        setShowRequestForm(true);
      }
    }, 1500);
  }, [inviteCode, inviteAttempts]);

  const handleAlternativeVerification = useCallback(() => {
    setStage("captcha");
    setCaptchaIndex(0);
    setCaptchaGridSelected(new Set());
    setCaptchaTextInput("");
    setCaptchaFailed(false);
  }, []);

  const handleCaptchaSubmit = useCallback(() => {
    const current = CAPTCHA_QUESTIONS[captchaIndex];
    setCaptchaFailed(true);
    setCaptchaFailMessage(current.explanation);

    setTimeout(() => {
      if (captchaIndex < CAPTCHA_QUESTIONS.length - 1) {
        setCaptchaIndex((i) => i + 1);
        setCaptchaGridSelected(new Set());
        setCaptchaTextInput("");
        setCaptchaFailed(false);
        setCaptchaFailMessage("");
      } else {
        setStage("queue");
        setQueuePosition(10245);
        setQueueLogs([
          `[${new Date().toLocaleTimeString()}] Welcome to the queue. Your initial position: #10,245`,
        ]);
        setWaitTimeIndex(0);
      }
    }, 2500);
  }, [captchaIndex]);

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

  // ============================================================
  // Render
  // ============================================================

  return (
    <>
      {/* -------- Navbar -------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold gradient-text tracking-tight">
              WaitlistAI
            </span>
            <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
              <button className="hover:text-white transition-colors cursor-not-allowed">
                Product
              </button>
              <button className="hover:text-white transition-colors cursor-not-allowed">
                Research
              </button>
              <button className="hover:text-white transition-colors cursor-not-allowed">
                Safety
              </button>
              <Link href="/leaderboard" className="hover:text-white transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-600 font-mono hidden sm:block">
              v0.{process.env.NEXT_PUBLIC_GIT_COMMIT_COUNT || "0"}.
              {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
            </span>
            <button
              onClick={handleJoinWaitlist}
              className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* -------- Hero Section -------- */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 text-center">
        <div className="animate-slide-up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            NOW IN CLOSED ALPHA v0.0.1-pre-alpha-nightly-unstable
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="gradient-text">WaitlistAI</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-2 max-w-2xl mx-auto">
            The AI That Waits For You
          </p>
          <p className="text-base text-zinc-600 mb-10 max-w-xl mx-auto font-mono">
            AGI-Ready &middot; Quantum-Aligned &middot; Next-Gen Paradigm
            &middot; Currently Unavailable
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleJoinWaitlist}
              className="glow-button px-8 py-4 text-lg font-semibold text-white rounded-xl cursor-pointer"
            >
              Join the Waitlist
            </button>
            <button className="px-8 py-4 text-lg text-zinc-400 border border-white/10 rounded-xl hover:bg-white/5 transition-all cursor-not-allowed">
              Read the Paper
            </button>
          </div>

          <p className="text-sm text-zinc-600">
            <span className="text-zinc-400 font-mono tabular-nums">
              {socialCount.toLocaleString()}
            </span>{" "}
            developers are already waiting
          </p>
        </div>
      </section>

      {/* -------- Features Section -------- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Redefining the{" "}
          <span className="gradient-text">Paradigm of Waiting</span>
        </h2>
        <p className="text-zinc-500 text-center mb-16 max-w-2xl mx-auto">
          We leverage cutting-edge transformer architectures, reinforcement
          learning from human frustration (RLHF), and a proprietary
          Waitlist-as-a-Service (WaaS) infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="glass-card glass-card-hover p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg font-mono gradient-text mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* -------- Pricing Section -------- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Simple, <span className="gradient-text">Transparent</span> Pricing
        </h2>
        <p className="text-zinc-500 text-center mb-16 max-w-lg mx-auto">
          Every plan comes with unlimited waiting, guaranteed queue regression,
          and a sense of existential dread.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card p-8 flex flex-col ${
                tier.highlighted
                  ? "border-purple-500/30 bg-purple-500/5 ring-1 ring-purple-500/20"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <span className="text-xs font-mono text-purple-400 mb-4 uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-zinc-500 text-sm">{tier.period}</span>
              </div>
              <span className="inline-block text-xs font-mono px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 w-fit">
                {tier.status}
              </span>
              <ul className="flex-1 space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <span className="text-emerald-500 mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              {"footnote" in tier && (
                <p className="text-[10px] text-zinc-700 mb-4">
                  {tier.footnote}
                </p>
              )}
              <button
                onClick={handleJoinWaitlist}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  tier.highlighted
                    ? "glow-button text-white"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                }`}
              >
                Join Waitlist
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* -------- Leaderboard CTA -------- */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="glass-card p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="gradient-text">Global Waiting Leaderboard</span>
          </h2>
          <p className="text-zinc-500 mb-6 max-w-md mx-auto">
            See who has wasted the most time on this completely meaningless
            waitlist. Spoiler: it could be you.
          </p>
          <Link
            href="/leaderboard"
            className="inline-block px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            View Leaderboard &rarr;
          </Link>
        </div>
      </section>

      {/* -------- Footer -------- */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm gradient-text font-bold">WaitlistAI</span>
            <span className="text-xs text-zinc-700">
              &copy; {new Date().getFullYear()} WaitlistAI, Inc. All waits
              reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              Privacy
            </span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              Terms
            </span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">
              Status
            </span>
            <a
              href="https://github.com/kuhung"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-[10px] text-zinc-700 font-mono">
            Build {process.env.NEXT_PUBLIC_GIT_HASH || "dev"} |{" "}
            {process.env.NEXT_PUBLIC_BUILD_TIME
              ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleDateString("en-CA")
              : "local"}{" "}
            | You have wasted{" "}
            <span className="text-zinc-500">{formatTime(timeSpent)}</span> here
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* Modal Overlay System */}
      {/* ============================================================ */}

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
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors text-xl cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            {/* -------- Stage: Invite Code -------- */}
            {stage === "invite" && (
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Enter Your Invite Code
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  Access requires a valid invite code from an existing member.
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
                    placeholder="XXXX-XXXX-XXXX-XXXX"
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
                      Verifying across {Math.floor(Math.random() * 47) + 3}{" "}
                      quantum nodes...
                    </span>
                  ) : (
                    "Verify Code"
                  )}
                </button>

                <div className="mt-6 pt-4 border-t border-white/5">
                  {!showRequestForm ? (
                    <button
                      onClick={() => setShowRequestForm(true)}
                      className="text-sm text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      Don&apos;t have an invite code? Request one &rarr;
                    </button>
                  ) : (
                    <div className="animate-slide-up">
                      <p className="text-sm text-zinc-500 mb-3">
                        To request an invite code, please enter your referral
                        invite code:
                      </p>
                      <input
                        type="text"
                        placeholder="Enter referral invite code..."
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                        disabled
                      />
                      <p className="mt-2 text-xs text-zinc-700">
                        Hmm. It seems you need an invite code to get an invite
                        code.{" "}
                        <span className="text-zinc-600">How peculiar.</span>
                      </p>

                      {inviteAttempts >= 3 && (
                        <button
                          onClick={handleAlternativeVerification}
                          className="mt-4 w-full py-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all cursor-pointer"
                        >
                          Try Alternative Verification (CAPTCHA) &rarr;
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* -------- Stage: CAPTCHA -------- */}
            {stage === "captcha" && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Identity Verification
                  </span>
                  <span className="text-xs text-zinc-600">
                    Step {captchaIndex + 1}/{CAPTCHA_QUESTIONS.length}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-6">
                  {CAPTCHA_QUESTIONS[captchaIndex].question}
                </h3>

                {/* Grid CAPTCHA */}
                {CAPTCHA_QUESTIONS[captchaIndex].type === "grid" && (
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
                {CAPTCHA_QUESTIONS[captchaIndex].type === "text" && (
                  <div className="mb-4">
                    <textarea
                      value={captchaTextInput}
                      onChange={(e) => setCaptchaTextInput(e.target.value)}
                      placeholder="Type your proof of consciousness here..."
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-all resize-none h-24"
                    />
                    <p className="text-[10px] text-zinc-700 mt-1">
                      Note: This response will be used to train our AI to better
                      impersonate humans.
                    </p>
                  </div>
                )}

                {/* Boolean CAPTCHA */}
                {CAPTCHA_QUESTIONS[captchaIndex].type === "boolean" && (
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={handleCaptchaSubmit}
                      className="flex-1 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all cursor-pointer"
                    >
                      True
                    </button>
                    <button
                      onClick={handleCaptchaSubmit}
                      className="flex-1 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all cursor-pointer"
                    >
                      False
                    </button>
                  </div>
                )}

                {captchaFailed && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-slide-up">
                    {captchaFailMessage}
                  </div>
                )}

                {CAPTCHA_QUESTIONS[captchaIndex].type !== "boolean" && (
                  <button
                    onClick={handleCaptchaSubmit}
                    className="w-full py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium hover:bg-cyan-500/20 transition-all cursor-pointer"
                  >
                    Submit Verification
                  </button>
                )}
              </div>
            )}

            {/* -------- Stage: Queue -------- */}
            {stage === "queue" && (
              <div>
                <div className="text-center mb-6">
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-2">
                    Your Queue Position
                  </p>
                  <div className="text-5xl md:text-6xl font-bold font-mono gradient-text-warm animate-count-up">
                    #{queuePosition.toLocaleString()}
                  </div>
                  <p className="text-sm text-zinc-600 mt-2">
                    Estimated wait time:{" "}
                    <span className="text-amber-400 font-mono">
                      {WAIT_TIME_STAGES[waitTimeIndex]}
                    </span>
                  </p>
                </div>

                {/* Progress bar (going backwards) */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-zinc-600 mb-1">
                    <span>Progress</span>
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

                {/* Queue log */}
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
                  Why is my position going backwards? View Analysis &rarr;
                </button>
              </div>
            )}

            {/* -------- Stage: Rejection Report -------- */}
            {stage === "rejection" && (
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  AI Compatibility Report
                </h3>
                <p className="text-xs text-zinc-600 font-mono mb-6">
                  Report ID: {Math.random().toString(36).substring(2, 10).toUpperCase()} |
                  Generated at {new Date().toLocaleTimeString()}
                </p>

                <div className="space-y-4 mb-6">
                  {REJECTION_METRICS.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-400">{metric.label}</span>
                        <span
                          className={`font-mono ${metric.inverted ? "text-amber-400" : "text-red-400"}`}
                        >
                          {metric.value}
                          {metric.unit}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            metric.inverted
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
                    Recommendation
                  </p>
                  <p className="text-sm text-zinc-500">
                    Based on our comprehensive analysis, you are not eligible for
                    access at this time. Your Hype Susceptibility Index is
                    concerning -- you actually believed this might work.
                    Please try again in{" "}
                    <span className="text-zinc-400 font-mono">
                      2-3 business eternities
                    </span>
                    .
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStage("queue")}
                    className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-sm hover:bg-white/10 transition-all cursor-pointer"
                  >
                    &larr; Back to Queue
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 rounded-lg glow-button text-white text-sm cursor-pointer"
                  >
                    Accept Your Fate
                  </button>
                </div>
              </div>
            )}

            {/* -------- Stage: Easter Egg -------- */}
            {stage === "easter-egg" && (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">&#127881;</div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Congratulations!
                </h3>
                <p className="text-zinc-400 mb-4">
                  You have unlocked the highest level of access.
                </p>
                <div className="inline-block px-6 py-3 rounded-lg bg-white/5 border border-white/10 font-mono text-2xl text-zinc-500 mb-6">
                  Your invite code: <span className="text-white">NULL</span>
                </div>
                <p className="text-sm text-zinc-600 mb-8">
                  Please take this code and go touch grass.
                  <br />
                  The real AGI was the friends we made along the way.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-lg glow-button text-white cursor-pointer"
                >
                  Return to Reality
                </button>
                {/* Confetti */}
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
