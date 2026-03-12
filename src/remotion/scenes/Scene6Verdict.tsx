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
import { ProgressBar } from "../components/ProgressBar";
import type { Locale } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Scene6Verdict: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].verdict;

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const recommendationOpacity = interpolate(
    frame,
    [fps * 5, fps * 5.5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const stampSpring = spring({
    frame: frame - fps * 5.5,
    fps,
    config: { damping: 10, stiffness: 250 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Report card */}
      <div
        style={{
          width: 680,
          backgroundColor: COLORS.surface,
          borderRadius: 20,
          padding: 44,
          border: `1px solid rgba(168, 85, 247, 0.15)`,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [50, 0])}px)`,
          opacity: cardSpring,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 32,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          {t.title}
        </div>

        {/* Metrics */}
        {t.metrics.map((metric, i) => {
          const metricDelay = fps * 0.8 + i * fps * 0.6;
          const barColor =
            metric.value > 50 ? COLORS.danger : COLORS.primary;
          return (
            <ProgressBar
              key={metric.name}
              label={metric.name}
              value={metric.value}
              startFrame={metricDelay}
              fillDuration={Math.floor(fps * 0.8)}
              barColor={barColor}
              width={592}
            />
          );
        })}

        {/* Recommendation */}
        <div
          style={{
            marginTop: 24,
            padding: "16px 20px",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderRadius: 12,
            opacity: recommendationOpacity,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: COLORS.muted,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {locale === "en" ? "Recommendation" : "\u5efa\u8bae"}
          </div>
          <div style={{ fontSize: 18, color: COLORS.danger, fontWeight: 600 }}>
            {t.recommendation}
          </div>
        </div>
      </div>

      {/* Retry stamp */}
      {frame >= fps * 5.5 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            fontSize: 30,
            fontWeight: 700,
            color: COLORS.primary,
            opacity: interpolate(stampSpring, [0, 1], [0, 1]),
            transform: `scale(${stampSpring})`,
            textAlign: "center",
          }}
        >
          {t.retry}
        </div>
      )}
    </AbsoluteFill>
  );
};
