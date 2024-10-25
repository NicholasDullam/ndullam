"use client";

import { wavePropsSchema, WavePropsSchema } from "@/components";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export const CONFIGURATION_PRESET_TYPES = ["Default", "Custom"] as const;
export type ConfigurationPresetType =
  (typeof CONFIGURATION_PRESET_TYPES)[number];

export const CONFIGURATION_PRESETS: Record<
  Exclude<ConfigurationPresetType, "Custom">,
  WavePropsSchema
> = {
  Default: {
    scale: 10,
    interval: 50,
    lifespan: 20,
    spread: [0.1, 0.4, 0.1, 0.9],
  },
} as const;

export type ConfigurationPreset = (keyof typeof CONFIGURATION_PRESETS)[number];

export type WaveProviderContext = {
  preset: ConfigurationPresetType;
  configuration: WavePropsSchema;
  setPreset: (preset: ConfigurationPresetType) => void;
  setConfiguration: (configuration: WavePropsSchema) => void;
};

export const WaveProviderContext = createContext<WaveProviderContext>(
  {} as WaveProviderContext,
);

export const useWaveProviderContext = () => useContext(WaveProviderContext);

export type WaveProviderProps = {
  children: ReactNode;
};

export const WaveProvider = ({ children }: WaveProviderProps) => {
  const defaults = useMemo(() => wavePropsSchema.parse({}), []);

  const [configuration, setConfiguration] = useState<WavePropsSchema>(defaults);
  const [preset, setPreset] = useState<ConfigurationPresetType>("Default");

  const context = useMemo(
    () => ({ preset, configuration, setPreset, setConfiguration }),
    [preset, configuration, setPreset, setConfiguration],
  );
  return (
    <WaveProviderContext.Provider value={context}>
      {children}
    </WaveProviderContext.Provider>
  );
};
