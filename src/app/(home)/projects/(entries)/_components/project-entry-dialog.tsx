"use client";

import { Button } from "@/components/ui";
import clsx from "clsx";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

const TRANSITION_DURATION = 150 as const;

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
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className="h-full w-full bg-black fixed z-30 top-0 left-0 transition-all opacity-0 data-[state=closed]:pointer-events-none data-[state=open]:opacity-30"
      />
      <div
        data-state={open ? "open" : "closed"}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className={clsx(
          "fixed z-[60] overflow-x-hidden right-0 top-0 h-full w-[650px] max-w-full bg-black transform transition-all data-[state=closed]:translate-x-full",
        )}
      >
        <Button
          variant={"outline"}
          className="fixed top-2 left-2 p-1.5 h-auto z-[100]"
          onClick={onClose}
        >
          <X size={12} />
        </Button>
        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
};
