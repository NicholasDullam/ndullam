"use client";

import { Wave } from "@/components";
import { useRef } from "react";
import { useWaveProviderContext } from "./wave-provider";

export type WaveWrapperProps = {};

export const WaveWrapper = ({}: WaveWrapperProps) => {
  const { configuration } = useWaveProviderContext();
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="grow" ref={containerRef}>
      <Wave containerRef={containerRef} {...configuration} />
    </div>
  );
};
