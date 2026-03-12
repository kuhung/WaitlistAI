import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";

type ProgressBarProps = {
  label: string;
  value: number;
  startFrame?: number;
  fillDuration?: number;
  barColor?: string;
  width?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  startFrame = 0,
  fillDuration = 30,
  barColor = COLORS.primary,
  width = 600,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const fillProgress = interpolate(localFrame, [0, fillDuration], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const displayValue = fillProgress.toFixed(value < 1 ? 1 : 0);

  return (
    <div style={{ width, marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          color: COLORS.text,
        }}
      >
        <span>{label}</span>
        <span style={{ color: value > 50 ? COLORS.danger : COLORS.muted }}>
          {displayValue}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 8,
          backgroundColor: COLORS.surface,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${fillProgress}%`,
            height: "100%",
            backgroundColor: barColor,
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
};
