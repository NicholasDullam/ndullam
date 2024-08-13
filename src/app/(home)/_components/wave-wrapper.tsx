"use client";

import { Wave } from "@/components";
import { ComponentProps } from "react";
import { useWaveProviderContext } from "./wave-provider";

export type WaveWrapperProps = Pick<
  ComponentProps<typeof Wave>,
  "containerRef"
>;

export const WaveWrapper = ({ containerRef }: WaveWrapperProps) => {
  const { configuration } = useWaveProviderContext();
  return <Wave containerRef={containerRef} {...configuration} />;
};
