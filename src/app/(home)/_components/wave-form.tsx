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
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
    CONFIGURATION_PRESET_TYPES,
    CONFIGURATION_PRESETS,
    useWaveProviderContext,
} from "./wave-provider";

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
          <FormLabel>
            Spread <span className="opacity-50">(N/E|S/W)</span>
          </FormLabel>
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
  const { setConfiguration, configuration, preset, setPreset } =
    useWaveProviderContext();

  const configurationParsed = useMemo(
    () => wavePropsSchema.parse(configuration),
    [configuration]
  );

  const defaultValues = useMemo(() => wavePropsSchema.parse({}), []);
  const form = useForm<WavePropsSchema>({
    resolver: zodResolver(wavePropsSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    reset(configurationParsed);
  }, [configurationParsed]);

  useEffect(() => {
    const trigger = watch((_, { type }) => {
      if (type === "change") handleSubmit(setConfiguration)();
    });
    return () => trigger.unsubscribe();
  }, [watch, handleSubmit, setConfiguration]);

  const onReset = useCallback(() => {
    reset(defaultValues);
    setConfiguration(defaultValues);
  }, [defaultValues, reset, setConfiguration]);

  useEffect(() => {
    if (isDirty) setPreset("Custom");
  }, [isDirty, setPreset]);

  useEffect(() => {
    if (preset === "Custom") return;
    reset(CONFIGURATION_PRESETS[preset], {
      keepDefaultValues: true,
      keepDirty: false,
    });
    setConfiguration(CONFIGURATION_PRESETS[preset]);
  }, [preset, reset, setConfiguration]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label>Preset</Label>
          <Select onValueChange={setPreset} value={preset}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CONFIGURATION_PRESET_TYPES.map((preset) => (
                <SelectItem key={preset} value={preset}>
                  {preset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        <ControlledInput
          name="lifespan"
          control={control}
          label="Lifespan"
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
