import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { COLORS, TEXTS } from "../constants";
import type { Locale } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Scene7CTA: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].cta;

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const glowPulse = 0.3 + Math.sin(frame * 0.08) * 0.15;

  const line1Chars = Math.min(
    Math.floor(
      interpolate(frame, [fps * 0.8, fps * 2.2], [0, t.line1.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    ),
    t.line1.length
  );

  const line2Chars = Math.min(
    Math.floor(
      interpolate(frame, [fps * 2.5, fps * 3.8], [0, t.line2.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    ),
    t.line2.length
  );

  const urlOpacity = interpolate(frame, [fps * 4, fps * 4.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [fps * 4.2, fps * 4.6], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showLine1Cursor =
    frame >= fps * 0.8 && frame < fps * 2.5 && Math.floor(frame / 8) % 2 === 0;
  const showLine2Cursor =
    frame >= fps * 2.5 && frame < fps * 4 && Math.floor(frame / 8) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${logoSpring})`,
          marginBottom: 40,
          filter: `drop-shadow(0 0 ${glowPulse * 40}px rgba(168, 85, 247, ${glowPulse}))`,
        }}
      >
        WaitlistAI
      </div>

      {/* Line 1 */}
      <div
        style={{
          fontSize: 36,
          color: COLORS.text,
          fontWeight: 700,
          marginBottom: 12,
          minHeight: 44,
        }}
      >
        {t.line1.slice(0, line1Chars)}
        {showLine1Cursor && (
          <span style={{ color: COLORS.primary }}>|</span>
        )}
      </div>

      {/* Line 2 */}
      <div
        style={{
          fontSize: 28,
          color: COLORS.muted,
          marginBottom: 40,
          minHeight: 36,
        }}
      >
        {t.line2.slice(0, line2Chars)}
        {showLine2Cursor && (
          <span style={{ color: COLORS.primary }}>|</span>
        )}
      </div>

      {/* URL */}
      <div
        style={{
          fontSize: 22,
          color: COLORS.secondary,
          opacity: urlOpacity,
          letterSpacing: 2,
          padding: "12px 28px",
          border: `1px solid ${COLORS.secondary}40`,
          borderRadius: 8,
        }}
      >
        {t.url}
      </div>

      {/* Version badge */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          fontSize: 12,
          color: COLORS.muted,
          opacity: badgeOpacity,
          letterSpacing: 1,
        }}
      >
        v0.0.1-pre-alpha-nightly-unstable
      </div>
    </AbsoluteFill>
  );
};
