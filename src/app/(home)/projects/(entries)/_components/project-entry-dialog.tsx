"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

const TRANSITION_DURATION = 300 as const;

export type ProjectEntryDialogProps = {
  children: ReactNode;
};

export const ProjectEntryDialog = ({ children }: ProjectEntryDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const router = useRouter();

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => router.push("/projects"), TRANSITION_DURATION);
  }, [router]);

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          `h-full w-full bg-black fixed z-30 top-0 left-0 transition-all duration-[${TRANSITION_DURATION}]`,
          {
            "pointer-events-none opacity-0": !open,
            "opacity-30": open,
          }
        )}
      />
      <div
        className={clsx(
          "fixed z-[60] overflow-x-hidden overflow-y-auto right-0 top-0 h-full w-[500px] max-w-full bg-black transform transition-all",
          {
            "translate-x-full": !open,
          }
        )}
      >
        {children}
      </div>
    </>
  );
};
