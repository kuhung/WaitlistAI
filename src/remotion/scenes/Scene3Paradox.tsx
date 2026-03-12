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

export const Scene3Paradox: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].paradox;

  const modalSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const fakeCode = "QNTM-4X7B-PRLL-9Z2K";
  const typeProgress = interpolate(frame, [fps * 1, fps * 2.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typedChars = Math.floor(typeProgress * fakeCode.length);
  const typedCode = fakeCode.slice(0, typedChars);
  const showCursor = Math.floor(frame / 8) % 2 === 0 && frame < fps * 3;

  const errorOpacity = interpolate(frame, [fps * 3, fps * 3.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const requestPhase = frame >= fps * 4;
  const requestOpacity = interpolate(frame, [fps * 4, fps * 4.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punchlinePhase = frame >= fps * 5.5;
  const punchlineOpacity = interpolate(frame, [fps * 5.5, fps * 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoomScale = punchlinePhase
    ? interpolate(frame, [fps * 5.5, fps * 7], [1, 1.15], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      })
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${zoomScale})`,
      }}
    >
      {/* Modal */}
      <div
        style={{
          width: 560,
          backgroundColor: COLORS.surface,
          borderRadius: 20,
          padding: 40,
          border: `1px solid rgba(168, 85, 247, 0.2)`,
          transform: `translateY(${interpolate(modalSpring, [0, 1], [60, 0])}px)`,
          opacity: modalSpring,
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {t.enterCode}
        </div>

        {/* Input field */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: `1px solid ${COLORS.muted}40`,
            borderRadius: 10,
            padding: "14px 18px",
            fontSize: 22,
            color: COLORS.text,
            fontFamily: "monospace",
            letterSpacing: 3,
            marginBottom: 16,
          }}
        >
          {typedCode}
          {showCursor && (
            <span style={{ color: COLORS.primary }}>|</span>
          )}
        </div>

        {/* Error message */}
        {frame >= fps * 3 && (
          <div
            style={{
              opacity: errorOpacity,
              color: COLORS.danger,
              fontSize: 15,
              padding: "10px 14px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            {t.error}
          </div>
        )}

        {/* Request link */}
        {frame >= fps * 3.8 && (
          <div
            style={{
              opacity: requestPhase
                ? interpolate(frame, [fps * 3.8, fps * 4.2], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : 0,
              color: COLORS.secondary,
              fontSize: 15,
              cursor: "pointer",
              textDecoration: "underline",
              marginBottom: 16,
            }}
          >
            {t.noCode} &rarr;
          </div>
        )}

        {/* Request prompt */}
        {requestPhase && (
          <div
            style={{
              opacity: requestOpacity,
              color: COLORS.muted,
              fontSize: 15,
              fontStyle: "italic",
              marginBottom: 8,
            }}
          >
            {t.requestPrompt}
          </div>
        )}
      </div>

      {/* Punchline overlay */}
      {punchlinePhase && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            textAlign: "center",
            opacity: punchlineOpacity,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: 8,
            }}
          >
            {t.punchline}
          </div>
          <div style={{ fontSize: 24, color: COLORS.primary }}>
            {t.suffix}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
