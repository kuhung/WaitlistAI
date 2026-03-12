export const COMP_WIDTH = 1920;
export const COMP_HEIGHT = 1080;
export const COMP_FPS = 30;
export const DURATION_IN_FRAMES = 1350; // 45s

export const SCENE_FRAMES = {
  reveal: { from: 0, duration: 150 },
  hype: { from: 150, duration: 210 },
  paradox: { from: 360, duration: 210 },
  captcha: { from: 570, duration: 210 },
  queue: { from: 780, duration: 210 },
  verdict: { from: 990, duration: 210 },
  cta: { from: 1200, duration: 150 },
} as const;

export const COLORS = {
  bg: "#0a0a0a",
  surface: "#111111",
  primary: "#a855f7",
  secondary: "#06b6d4",
  danger: "#ef4444",
  success: "#22c55e",
  text: "#e5e5e5",
  muted: "#737373",
} as const;

export const TEXTS = {
  en: {
    reveal: {
      buzzwords: ["AGI-Ready", "Quantum-Aligned", "Currently Unavailable"],
      brand: "WaitlistAI",
      tagline: "The AI That Waits For You",
    },
    hype: {
      counter: "1,247,893 developers are already waiting",
      features: [
        {
          title: "Quantum-Aligned Processing",
          desc: "Results may vary by timeline",
        },
        {
          title: "AGI-Ready Architecture",
          desc: "Once someone figures out what that means",
        },
        {
          title: "Zero-Latency Hallucinations",
          desc: "Wrong answers, faster than ever",
        },
        {
          title: "Infinite Context Window",
          desc: "We just can't access most of it",
        },
        {
          title: "Neural Pathway Optimization",
          desc: "Side effects: existential dread",
        },
        {
          title: "Blockchain-Verified Tokens",
          desc: "Investors love it",
        },
      ],
    },
    paradox: {
      enterCode: "Enter Your Invite Code",
      error: "This invite code belongs to a parallel universe.",
      noCode: "Don't have a code? Request one",
      requestPrompt:
        "To request an invite code, please enter your referral invite code.",
      punchline: "You need an invite code to get an invite code.",
      suffix: "How peculiar.",
    },
    captcha: {
      step1: "Select all squares containing AGI",
      result1: "No images contained AGI. AGI does not exist yet.",
      step2: "Prove you are not an AI pretending to be human",
      result2: "An AI would say exactly that.",
      step3: "This statement is false — True or False?",
      result3: "This is by design. Welcome to AI ethics.",
      failed: "VERIFICATION FAILED",
    },
    queue: {
      title: "Your Queue Position",
      going: "Your position is going backwards.",
      wait: "Estimated wait:",
      times: [
        "3 hours",
        "2 days",
        "3 weeks",
        "6 months",
        "1 geological epoch",
        "\u221e",
      ],
    },
    verdict: {
      title: "AI Compatibility Report",
      metrics: [
        { name: "AI Compatibility Index", value: 12 },
        { name: "Prompt Engineering Quotient", value: 3 },
        { name: "Compute Worthiness Score", value: 0.7 },
        { name: "Vibe Alignment Factor", value: 41 },
        { name: "Hype Susceptibility Index", value: 98 },
      ],
      recommendation: "You are not eligible.",
      retry: "Try again in 2-3 business eternities.",
    },
    cta: {
      line1: "Join the waitlist. Or don't.",
      line2: "You'll be waiting either way.",
      url: "waitlist-ai.vercel.app",
    },
  },
  zh: {
    reveal: {
      buzzwords: ["AGI\u5c31\u7eea", "\u91cf\u5b50\u5bf9\u9f50", "\u6682\u4e0d\u53ef\u7528"],
      brand: "WaitlistAI",
      tagline: "\u4e3a\u4f60\u7b49\u5f85\u7684 AI",
    },
    hype: {
      counter: "1,247,893 \u540d\u5f00\u53d1\u8005\u6b63\u5728\u7b49\u5f85\u4e2d",
      features: [
        { title: "\u91cf\u5b50\u5bf9\u9f50\u5904\u7406", desc: "\u7ed3\u679c\u53ef\u80fd\u56e0\u65f6\u95f4\u7ebf\u800c\u5f02" },
        {
          title: "AGI\u5c31\u7eea\u67b6\u6784",
          desc: "\u7b49\u6709\u4eba\u5f04\u660e\u767d\u90a3\u662f\u4ec0\u4e48\u610f\u601d",
        },
        { title: "\u96f6\u5ef6\u8fdf\u5e7b\u89c9", desc: "\u9519\u8bef\u7b54\u6848\uff0c\u524d\u6240\u672a\u6709\u7684\u901f\u5ea6" },
        {
          title: "\u65e0\u9650\u4e0a\u4e0b\u6587\u7a97\u53e3",
          desc: "\u53ea\u662f\u5927\u90e8\u5206\u6211\u4eec\u8bbf\u95ee\u4e0d\u4e86",
        },
        {
          title: "\u795e\u7ecf\u901a\u8def\u4f18\u5316",
          desc: "\u526f\u4f5c\u7528\uff1a\u5b58\u5728\u6027\u6050\u60e7",
        },
        { title: "\u533a\u5757\u94fe\u9a8c\u8bc1Token", desc: "\u6295\u8d44\u4eba\u5f88\u559c\u6b22" },
      ],
    },
    paradox: {
      enterCode: "\u8f93\u5165\u4f60\u7684\u9080\u8bf7\u7801",
      error: "\u8fd9\u4e2a\u9080\u8bf7\u7801\u5c5e\u4e8e\u4e00\u4e2a\u5e73\u884c\u5b87\u5b99\u3002",
      noCode: "\u6ca1\u6709\u9080\u8bf7\u7801\uff1f\u7533\u8bf7\u4e00\u4e2a",
      requestPrompt: "\u8981\u7533\u8bf7\u9080\u8bf7\u7801\uff0c\u8bf7\u8f93\u5165\u4f60\u7684\u63a8\u8350\u9080\u8bf7\u7801\u3002",
      punchline: "\u4f60\u9700\u8981\u4e00\u4e2a\u9080\u8bf7\u7801\u624d\u80fd\u83b7\u5f97\u9080\u8bf7\u7801\u3002",
      suffix: "\u591a\u4e48\u5947\u5999\u3002",
    },
    captcha: {
      step1: "\u9009\u62e9\u6240\u6709\u5305\u542bAGI\u7684\u65b9\u683c",
      result1: "\u6ca1\u6709\u56fe\u50cf\u5305\u542bAGI\u3002AGI\u5c1a\u4e0d\u5b58\u5728\u3002",
      step2: "\u8bc1\u660e\u4f60\u4e0d\u662f\u5047\u88c5\u6210\u4eba\u7c7b\u7684AI",
      result2: "AI\u6070\u6070\u4f1a\u8bf4\u51fa\u90a3\u6837\u7684\u8bdd\u3002",
      step3: "\u8fd9\u53e5\u8bdd\u662f\u5047\u7684 \u2014\u2014 \u771f\u8fd8\u662f\u5047\uff1f",
      result3: "\u8fd9\u662f\u8bbe\u8ba1\u5982\u6b64\u3002\u6b22\u8fce\u6765\u5230 AI \u4f26\u7406\u3002",
      failed: "\u9a8c\u8bc1\u5931\u8d25",
    },
    queue: {
      title: "\u4f60\u7684\u6392\u961f\u4f4d\u7f6e",
      going: "\u4f60\u7684\u4f4d\u7f6e\u5728\u5012\u9000\u3002",
      wait: "\u9884\u8ba1\u7b49\u5f85\uff1a",
      times: [
        "3\u5c0f\u65f6",
        "2\u5929",
        "3\u5468",
        "6\u4e2a\u6708",
        "1\u4e2a\u5730\u8d28\u7eaa\u5143",
        "\u221e",
      ],
    },
    verdict: {
      title: "AI\u517c\u5bb9\u6027\u62a5\u544a",
      metrics: [
        { name: "AI\u517c\u5bb9\u6027\u6307\u6570", value: 12 },
        { name: "\u63d0\u793a\u8bcd\u5de5\u7a0b\u5546\u6570", value: 3 },
        { name: "\u7b97\u529b\u914d\u5f97\u4e0a\u6307\u6570", value: 0.7 },
        { name: "\u6c1b\u56f4\u5bf9\u9f50\u56e0\u5b50", value: 41 },
        { name: "\u7092\u4f5c\u6613\u611f\u6307\u6570", value: 98 },
      ],
      recommendation: "\u4f60\u4e0d\u7b26\u5408\u6761\u4ef6\u3002",
      retry: "\u8bf7\u5728 2-3 \u4e2a\u5de5\u4f5c\u6c38\u6052\u540e\u91cd\u8bd5\u3002",
    },
    cta: {
      line1: "\u52a0\u5165\u7b49\u5f85\u540d\u5355\u3002\u6216\u8005\u4e0d\u52a0\u3002",
      line2: "\u53cd\u6b63\u4f60\u90fd\u5f97\u7b49\u3002",
      url: "waitlist-ai.vercel.app",
    },
  },
} as const;
