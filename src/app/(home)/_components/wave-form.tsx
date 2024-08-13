"use client";

import { wavePropsSchema, WavePropsSchema } from "@/components";
import { ControlledInput } from "@/components/controlled/controlled-input";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useWaveProviderContext } from "./wave-provider";

export type WaveSpreadControllerProps = {};
const SPREAD_DEFINITION = [0, 1, 2, 3] as const;

export const WaveSpreadController = ({}: WaveSpreadControllerProps) => {
  const { control } = useFormContext<WavePropsSchema>();
  return (
    <FormField
      control={control}
      name="spread"
      render={() => (
        <FormItem>
          <FormLabel>Spread</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-2">
              {SPREAD_DEFINITION.map((index) => (
                <FormField
                  key={index}
                  control={control}
                  name={`spread.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        key={index}
                        className="col-span-2"
                        type="number"
                        step={0.1}
                        min={0}
                        max={1}
                      />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export type WaveFormProps = {};

export const WaveForm = ({}: WaveFormProps) => {
  const { setConfiguration, configuration } = useWaveProviderContext();

  const configurationParsed = useMemo(
    () => wavePropsSchema.parse(configuration),
    [configuration]
  );

  const defaultValues = useMemo(() => wavePropsSchema.parse({}), []);
  const form = useForm<WavePropsSchema>({
    resolver: zodResolver(wavePropsSchema),
    defaultValues,
  });

  const { control, watch, handleSubmit, reset } = form;
  useEffect(() => {
    reset(configurationParsed);
  }, [configurationParsed]);

  useEffect(() => {
    const trigger = watch((_, { type }) => {
      if (type === "change") handleSubmit(setConfiguration)();
    });
    return () => trigger.unsubscribe();
  }, [watch]);

  const onReset = useCallback(() => {
    reset(defaultValues);
    setConfiguration(defaultValues);
  }, [defaultValues]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
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
        <WaveSpreadController />
        <Button variant={"outline"} type="reset" size={"sm"} onClick={onReset}>
          Reset
        </Button>
      </div>
    </Form>
  );
};
