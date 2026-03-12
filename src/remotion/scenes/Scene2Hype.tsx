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

const FEATURE_ICONS = ["\u269b", "\u{1f9e0}", "\u26a1", "\u267e\ufe0f", "\u{1f9ec}", "\u26d3\ufe0f"];

const SLIDE_DIRECTIONS = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: 0, y: 1 },
];

export const Scene2Hype: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].hype;

  const featureInterval = 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Feature cards grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          maxWidth: 1400,
        }}
      >
        {t.features.map((feature, i) => {
          const enterDelay = i * featureInterval;
          const cardSpring = spring({
            frame: frame - enterDelay,
            fps,
            config: { damping: 15, stiffness: 180 },
          });

          const slideDir = SLIDE_DIRECTIONS[i];
          const translateX = interpolate(cardSpring, [0, 1], [slideDir.x * 200, 0]);
          const translateY = interpolate(cardSpring, [0, 1], [slideDir.y * 200, 0]);

          const pulse =
            frame > enterDelay + 15
              ? 1 + Math.sin((frame - enterDelay) * 0.1) * 0.02
              : 1;

          return (
            <div
              key={i}
              style={{
                width: 400,
                padding: 28,
                backgroundColor: COLORS.surface,
                borderRadius: 16,
                border: `1px solid rgba(168, 85, 247, ${cardSpring * 0.3})`,
                transform: `translate(${translateX}px, ${translateY}px) scale(${cardSpring * pulse})`,
                opacity: cardSpring,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>
                {FEATURE_ICONS[i]}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.text,
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </div>
              <div style={{ fontSize: 16, color: COLORS.muted }}>
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontSize: 20,
          color: COLORS.muted,
          letterSpacing: 1,
          opacity: interpolate(frame, [fps * 4, fps * 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ color: COLORS.secondary, fontWeight: 700 }}>
          1,247,893
        </span>{" "}
        {t.counter.replace("1,247,893 ", "")}
      </div>
    </AbsoluteFill>
  );
};
