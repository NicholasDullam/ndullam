"use client";

import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";

export type InputProps = ComponentProps<typeof Input>;

export type ControlledInputProps<T extends FieldValues> = InputProps &
  Omit<ComponentProps<typeof FormField<T>>, "render"> & {
    label?: string;
    description?: string;
  };

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: ControlledInputProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
