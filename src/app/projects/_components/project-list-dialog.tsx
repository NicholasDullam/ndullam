"use client";

import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";

export type ProjectListDialogProps = {};

export const ProjectListDialog = ({}: ProjectListDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div>
      <div
        className={clsx(
          "fixed overflow-hidden right-0 top-0 h-full w-[800px] max-w-full bg-black transform transition-all",
          {
            "translate-x-full": open,
          }
        )}
      ></div>
    </div>
  );
};
