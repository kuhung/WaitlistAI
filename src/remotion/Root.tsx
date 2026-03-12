import React from "react";
import { Composition, Folder } from "remotion";
import { WaitlistPromo } from "./WaitlistPromo";
import { COMP_WIDTH, COMP_HEIGHT, COMP_FPS, DURATION_IN_FRAMES } from "./constants";
import type { WaitlistPromoProps } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="WaitlistAI-Promo">
      <Composition
        id="WaitlistPromo-EN"
        component={WaitlistPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        defaultProps={{ locale: "en" } satisfies WaitlistPromoProps}
      />
      <Composition
        id="WaitlistPromo-ZH"
        component={WaitlistPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
        defaultProps={{ locale: "zh" } satisfies WaitlistPromoProps}
      />
    </Folder>
  );
};
