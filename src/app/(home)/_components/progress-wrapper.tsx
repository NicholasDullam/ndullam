"use client";

import { AppProgressBar } from "next-nprogress-bar";
import { ComponentProps } from "react";

export type ProgressWrapperProps = ComponentProps<typeof AppProgressBar>;

export const ProgressWrapper = ({ ...props }: ProgressWrapperProps) => {
  return <AppProgressBar {...props} />;
};
