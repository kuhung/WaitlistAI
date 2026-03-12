import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { COLORS, TEXTS } from "../constants";
import type { Locale } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const LOG_MESSAGES_EN = [
  "A Tier-3 Quantum Subscriber has been prioritized above you.",
  "The algorithm has recalibrated your position based on cosmic alignment.",
  "A new batch of priority users has been inserted ahead.",
  "Someone with more Twitter followers has been given priority access.",
  "Our AI determined you can wait a little longer.",
];
const LOG_MESSAGES_ZH = [
  "\u4e00\u4f4d\u4e09\u7ea7\u91cf\u5b50\u8ba2\u9605\u7528\u6237\u5df2\u88ab\u4f18\u5148\u6392\u5728\u4f60\u524d\u9762\u3002",
  "\u7b97\u6cd5\u5df2\u6839\u636e\u5b87\u5b99\u5bf9\u9f50\u91cd\u65b0\u6821\u51c6\u4e86\u4f60\u7684\u4f4d\u7f6e\u3002",
  "\u4e00\u6279\u65b0\u7684\u4f18\u5148\u7528\u6237\u5df2\u63d2\u5165\u4f60\u7684\u524d\u9762\u3002",
  "\u4e00\u4f4dTwitter\u7c89\u4e1d\u66f4\u591a\u7684\u4eba\u5df2\u83b7\u5f97\u4f18\u5148\u8bbf\u95ee\u6743\u3002",
  "\u6211\u4eec\u7684AI\u5224\u5b9a\u4f60\u53ef\u4ee5\u518d\u7b49\u7b49\u3002",
];

export const Scene5Queue: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].queue;
  const logs = locale === "en" ? LOG_MESSAGES_EN : LOG_MESSAGES_ZH;

  const basePosition = 10245;
  const queuePosition = basePosition + Math.floor(
    interpolate(frame, [0, fps * 7], [0, 48000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.exp),
    })
  );

  const positionSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const waitTimeIndex = Math.min(
    Math.floor(frame / (fps * 1.1)),
    t.times.length - 1
  );

  const visibleLogs = logs.filter((_, i) => frame > fps * 1.5 + i * fps * 1.2);

  const progressWidth = interpolate(frame, [0, fps * 7], [35, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 20,
          color: COLORS.muted,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: positionSpring,
        }}
      >
        {t.title}
      </div>

      {/* Position number */}
      <div
        style={{
          fontSize: 140,
          fontWeight: 700,
          color: COLORS.text,
          opacity: positionSpring,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          marginBottom: 12,
        }}
      >
        #{queuePosition.toLocaleString()}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 600,
          height: 6,
          backgroundColor: COLORS.surface,
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: "100%",
            backgroundColor: COLORS.danger,
            borderRadius: 3,
            transition: "none",
          }}
        />
      </div>

      {/* Wait time */}
      <div
        style={{
          fontSize: 24,
          color: COLORS.muted,
          marginBottom: 40,
        }}
      >
        {t.wait}{" "}
        <span
          style={{
            color:
              waitTimeIndex >= t.times.length - 1
                ? COLORS.danger
                : COLORS.secondary,
            fontWeight: 700,
            fontSize: waitTimeIndex >= t.times.length - 1 ? 40 : 24,
          }}
        >
          {t.times[waitTimeIndex]}
        </span>
      </div>

      {/* Log messages */}
      <div
        style={{
          width: 700,
          maxHeight: 200,
          overflow: "hidden",
        }}
      >
        {visibleLogs.map((msg, i) => {
          const logDelay = fps * 1.5 + i * fps * 1.2;
          const logOpacity = interpolate(
            frame,
            [logDelay, logDelay + 10],
            [0, 0.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                fontSize: 14,
                color: COLORS.muted,
                opacity: logOpacity,
                padding: "6px 0",
                borderBottom: `1px solid rgba(115, 115, 115, 0.15)`,
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: COLORS.danger, marginRight: 8 }}>
                [!]
              </span>
              {msg}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
