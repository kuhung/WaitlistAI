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

const GRID_COLORS = [
  "#1a1a2e", "#16213e", "#0f3460", "#1a1a2e", "#0f3460",
  "#16213e", "#1a1a2e", "#0f3460", "#16213e",
];

export const Scene4Captcha: React.FC<{ locale: Locale }> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale].captcha;

  const phase1End = fps * 3;
  const phase2Start = fps * 3;
  const phase2End = fps * 4.5;
  const phase3Start = fps * 4.5;
  const failStampStart = fps * 5.5;

  const currentStep =
    frame < phase1End ? 1 : frame < phase3Start ? 2 : 3;

  const panelSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const selectedCells =
    frame > fps * 1.5
      ? [1, 3, 5, 7].filter(
          (_, i) => frame > fps * 1.5 + i * 8
        )
      : [];

  const failOpacity = interpolate(
    frame,
    [failStampStart, failStampStart + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const failScale = spring({
    frame: frame - failStampStart,
    fps,
    config: { damping: 8, stiffness: 300 },
  });

  const resultText =
    currentStep === 1
      ? t.result1
      : currentStep === 2
        ? t.result2
        : t.result3;

  const showResult =
    (currentStep === 1 && frame > fps * 2.5) ||
    (currentStep === 2 && frame > phase2End - fps * 0.5) ||
    (currentStep === 3 && frame > fps * 5);

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
      {/* CAPTCHA Panel */}
      <div
        style={{
          width: 520,
          backgroundColor: COLORS.surface,
          borderRadius: 20,
          padding: 36,
          border: `1px solid rgba(6, 182, 212, 0.2)`,
          transform: `translateY(${interpolate(panelSpring, [0, 1], [40, 0])}px)`,
          opacity: panelSpring,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div
            style={{ fontSize: 14, color: COLORS.muted, letterSpacing: 2 }}
          >
            IDENTITY VERIFICATION
          </div>
          <div style={{ fontSize: 14, color: COLORS.secondary }}>
            Step {currentStep}/3
          </div>
        </div>

        {/* Question */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 24,
          }}
        >
          {currentStep === 1 && t.step1}
          {currentStep === 2 && t.step2}
          {currentStep === 3 && t.step3}
        </div>

        {/* Grid (Step 1) */}
        {currentStep === 1 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 6,
              marginBottom: 20,
            }}
          >
            {GRID_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  backgroundColor: color,
                  borderRadius: 6,
                  border: selectedCells.includes(i)
                    ? `3px solid ${COLORS.secondary}`
                    : "2px solid transparent",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "rgba(255,255,255,0.1)",
                }}
              >
                {selectedCells.includes(i) && "\u2713"}
              </div>
            ))}
          </div>
        )}

        {/* Text input (Step 2) */}
        {currentStep === 2 && (
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: `1px solid ${COLORS.muted}40`,
              borderRadius: 10,
              padding: "14px 18px",
              fontSize: 16,
              color: COLORS.muted,
              fontStyle: "italic",
              marginBottom: 20,
              minHeight: 60,
            }}
          >
            I think therefore I am... or do I?
            {Math.floor(frame / 10) % 2 === 0 && (
              <span style={{ color: COLORS.secondary }}>|</span>
            )}
          </div>
        )}

        {/* Boolean buttons (Step 3) */}
        {currentStep === 3 && (
          <div
            style={{ display: "flex", gap: 16, marginBottom: 20 }}
          >
            {[t.step3.includes("True") ? "True" : "\u771f", t.step3.includes("False") ? "False" : "\u5047"].map(
              (label, i) => {
                const isPressed = frame > fps * 5 + i * 8;
                return (
                  <div
                    key={label}
                    style={{
                      flex: 1,
                      padding: "14px 0",
                      textAlign: "center",
                      backgroundColor: isPressed
                        ? COLORS.danger + "30"
                        : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isPressed ? COLORS.danger : COLORS.muted}40`,
                      borderRadius: 10,
                      fontSize: 20,
                      fontWeight: 700,
                      color: isPressed ? COLORS.danger : COLORS.text,
                    }}
                  >
                    {label}
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Result text */}
        {showResult && (
          <div
            style={{
              fontSize: 14,
              color: COLORS.danger,
              padding: "10px 14px",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderRadius: 8,
            }}
          >
            {resultText}
          </div>
        )}
      </div>

      {/* FAILED stamp */}
      {frame >= failStampStart && (
        <div
          style={{
            position: "absolute",
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.danger,
            opacity: failOpacity,
            transform: `scale(${failScale}) rotate(-12deg)`,
            border: `4px solid ${COLORS.danger}`,
            padding: "8px 32px",
            borderRadius: 8,
            letterSpacing: 8,
          }}
        >
          {t.failed}
        </div>
      )}
    </AbsoluteFill>
  );
};
