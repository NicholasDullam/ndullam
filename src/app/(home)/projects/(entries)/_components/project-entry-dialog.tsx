"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

const TRANSITION_DURATION = 150 as const;

export type ProjectEntryDialogProps = {
  children: ReactNode;
};

export const ProjectEntryDialog = ({ children }: ProjectEntryDialogProps) => {
  const [readerMode] = useState<boolean>(false);
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
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className="h-full w-full bg-black fixed z-30 top-0 left-0 transition-all opacity-0 data-[state=closed]:pointer-events-none data-[state=open]:opacity-30"
      />
      <div
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className={clsx(
          "fixed z-[60] overflow-x-hidden overflow-y-auto right-0 top-0 h-full w-[500px] max-w-full bg-black transform transition-all data-[state=closed]:translate-x-full",
          {
            "w-full flex justify-center": readerMode,
          },
        )}
      >
        {/* <div
          className="absolute top-2 right-2 text-sm bg-black text-white z-40"
          onClick={() => setReaderMode(!readerMode)}
        >
          ReaderMode
        </div>
        <div
          className={clsx("transition-all", {
            "mt-0": !readerMode,
            "max-w-full w-[800px] mt-8": readerMode,
          })}
        >
          {children}
        </div> */}
        {children}
      </div>
    </>
  );
};
