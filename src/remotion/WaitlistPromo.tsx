import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENE_FRAMES, COMP_FPS } from "./constants";
import { Scene1Reveal } from "./scenes/Scene1Reveal";
import { Scene2Hype } from "./scenes/Scene2Hype";
import { Scene3Paradox } from "./scenes/Scene3Paradox";
import { Scene4Captcha } from "./scenes/Scene4Captcha";
import { Scene5Queue } from "./scenes/Scene5Queue";
import { Scene6Verdict } from "./scenes/Scene6Verdict";
import { Scene7CTA } from "./scenes/Scene7CTA";
import type { Locale } from "./types";

type WaitlistPromoProps = {
  locale: Locale;
};

export const WaitlistPromo: React.FC<WaitlistPromoProps> = ({ locale }) => {
  const s = SCENE_FRAMES;
  const premount = COMP_FPS;

  return (
    <AbsoluteFill>
      <Sequence
        from={s.reveal.from}
        durationInFrames={s.reveal.duration}
        premountFor={0}
      >
        <Scene1Reveal locale={locale} />
      </Sequence>

      <Sequence
        from={s.hype.from}
        durationInFrames={s.hype.duration}
        premountFor={premount}
      >
        <Scene2Hype locale={locale} />
      </Sequence>

      <Sequence
        from={s.paradox.from}
        durationInFrames={s.paradox.duration}
        premountFor={premount}
      >
        <Scene3Paradox locale={locale} />
      </Sequence>

      <Sequence
        from={s.captcha.from}
        durationInFrames={s.captcha.duration}
        premountFor={premount}
      >
        <Scene4Captcha locale={locale} />
      </Sequence>

      <Sequence
        from={s.queue.from}
        durationInFrames={s.queue.duration}
        premountFor={premount}
      >
        <Scene5Queue locale={locale} />
      </Sequence>

      <Sequence
        from={s.verdict.from}
        durationInFrames={s.verdict.duration}
        premountFor={premount}
      >
        <Scene6Verdict locale={locale} />
      </Sequence>

      <Sequence
        from={s.cta.from}
        durationInFrames={s.cta.duration}
        premountFor={premount}
      >
        <Scene7CTA locale={locale} />
      </Sequence>
    </AbsoluteFill>
  );
};
