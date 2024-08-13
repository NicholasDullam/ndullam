"use client";

import { wavePropsSchema, WavePropsSchema } from "@/components";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { Form } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useWaveProviderContext } from "./wave-provider";

export type WaveFormProps = {};

export const WaveForm = ({}: WaveFormProps) => {
  const { setConfiguration } = useWaveProviderContext();

  const defaultValues = useMemo(() => wavePropsSchema.parse({}), []);
  const form = useForm<WavePropsSchema>({
    resolver: zodResolver(wavePropsSchema),
    defaultValues,
  });
  const { control, watch, handleSubmit } = form;

  useEffect(() => {
    const trigger = watch((_, { type }) => {
      if (type === "change") handleSubmit(setConfiguration)();
    });
    return () => trigger.unsubscribe();
  }, [watch]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <ControlledInput
          name="scale"
          control={control}
          label="Scale"
          type="number"
          step={1}
        />
        <ControlledInput
          name="interval"
          control={control}
          label="Interval"
          type="number"
          step={1}
        />
      </div>
    </Form>
  );
};
