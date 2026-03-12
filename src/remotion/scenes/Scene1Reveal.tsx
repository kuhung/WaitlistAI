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
import { GlitchText } from "../components/GlitchText";
import type { Locale } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Scene1Reveal: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].reveal;

  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  const buzzwordIndex = Math.min(
    Math.floor(frame / (fps * 1.2)),
    t.buzzwords.length - 1
  );
  const buzzwordLocalFrame = frame - buzzwordIndex * Math.floor(fps * 1.2);

  const buzzwordOpacity = interpolate(
    buzzwordLocalFrame,
    [0, 8, Math.floor(fps * 1) - 8, Math.floor(fps * 1)],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoEnterFrame = Math.floor(fps * 3.2);
  const logoSpring = spring({
    frame: frame - logoEnterFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const taglineOpacity = interpolate(
    frame,
    [logoEnterFrame + 15, logoEnterFrame + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showBuzzwords = frame < logoEnterFrame;
  const showLogo = frame >= logoEnterFrame;

  const scanlineY = (frame * 3) % 1080;

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
      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          top: scanlineY,
          left: 0,
          width: "100%",
          height: 2,
          backgroundColor: "rgba(168, 85, 247, 0.15)",
          zIndex: 10,
        }}
      />

      {/* Terminal cursor phase */}
      {frame < 15 && (
        <div
          style={{
            fontSize: 36,
            color: COLORS.primary,
            fontFamily: "monospace",
            opacity: cursorBlink ? 1 : 0,
          }}
        >
          _
        </div>
      )}

      {/* Buzzwords phase */}
      {showBuzzwords && frame >= 15 && (
        <div style={{ opacity: buzzwordOpacity, textAlign: "center" }}>
          <GlitchText
            text={t.buzzwords[buzzwordIndex]}
            fontSize={72}
            color={COLORS.primary}
            startFrame={0}
            glitchDuration={12}
            key={buzzwordIndex}
          />
        </div>
      )}

      {/* Logo phase */}
      {showLogo && (
        <div
          style={{
            textAlign: "center",
            transform: `scale(${logoSpring})`,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -2,
            }}
          >
            {t.brand}
          </div>
          <div
            style={{
              fontSize: 32,
              color: COLORS.muted,
              marginTop: 16,
              opacity: taglineOpacity,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {t.tagline}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
