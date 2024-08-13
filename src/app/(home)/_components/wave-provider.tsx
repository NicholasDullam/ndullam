"use client";

import { wavePropsSchema, WavePropsSchema } from "@/components";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type WaveProviderContext = {
  configuration: WavePropsSchema;
  setConfiguration: (configuration: WavePropsSchema) => void;
};

export const WaveProviderContext = createContext<WaveProviderContext>(
  {} as WaveProviderContext
);

export const useWaveProviderContext = () => useContext(WaveProviderContext);

export type WaveProviderProps = {
  children: ReactNode;
};

export const WaveProvider = ({ children }: WaveProviderProps) => {
  const defaults = useMemo(() => wavePropsSchema.parse({}), []);
  const [configuration, setConfiguration] = useState<WavePropsSchema>(defaults);
  return (
    <WaveProviderContext.Provider value={{ configuration, setConfiguration }}>
      {children}
    </WaveProviderContext.Provider>
  );
};
