"use client";

import { useRef } from "react";
import { Footer } from "./footer";
import { WaveDropdown } from "./wave-dropdown";
import { WaveProvider } from "./wave-provider";
import { WaveWrapper } from "./wave-wrapper";

export type HomeProps = {};

export const Home = ({}: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <WaveProvider>
      <div className="h-dvh overflow-hidden bg-black flex flex-col">
        <div className="fixed top-2 right-2">
          <WaveDropdown />
        </div>
        <div className="grow" ref={containerRef}>
          <WaveWrapper containerRef={containerRef} />
        </div>
        <Footer />
      </div>
    </WaveProvider>
  );
};
