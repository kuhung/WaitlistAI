import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

type GlitchTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  startFrame?: number;
  glitchDuration?: number;
};

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

function getGlitchChar(seed: number): string {
  return GLITCH_CHARS[Math.floor(seed * GLITCH_CHARS.length) % GLITCH_CHARS.length];
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 48,
  color = "#e5e5e5",
  startFrame = 0,
  glitchDuration = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const progress = interpolate(localFrame, [0, glitchDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const revealedCount = Math.floor(progress * text.length);

  const displayText = text
    .split("")
    .map((char, i) => {
      if (i < revealedCount) return char;
      if (char === " ") return " ";
      const seed = (localFrame * 7 + i * 13) % GLITCH_CHARS.length;
      return getGlitchChar(seed / GLITCH_CHARS.length);
    })
    .join("");

  const glitchOffset =
    localFrame < glitchDuration
      ? Math.sin(localFrame * 0.8) * interpolate(localFrame, [0, glitchDuration], [4, 0], { extrapolateRight: "clamp" })
      : 0;

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', monospace",
        fontSize,
        color,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        transform: `translateX(${glitchOffset}px)`,
        textShadow:
          localFrame < glitchDuration
            ? `${-glitchOffset}px 0 #a855f7, ${glitchOffset}px 0 #06b6d4`
            : "none",
      }}
    >
      {displayText}
    </div>
  );
};
