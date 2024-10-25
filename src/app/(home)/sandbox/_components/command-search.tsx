"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui";
import { CardStackIcon, TransformIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const TRANSITION_DURATION = 150 as const;

export type CommandSearchProps = {};

export const CommandSearch = ({}: CommandSearchProps) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => router.push("/"), TRANSITION_DURATION);
  }, [router]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      inert
      data-open={open}
      className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 group"
    >
      <div
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-data-[open=false]:pointer-events-none group-data-[open=true]:opacity-30 transition-all"
        onClick={onClose}
      />
      <div className="flex items-center justify-center w-52 max-w-full z-20">
        <Command
          style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
          className="transform opacity-0 scale-95 group-data-[open=true]:scale-100 group-data-[open=true]:opacity-100 transition-all border-border border"
        >
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Select sandbox..."
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              <CommandItem value="golf" asChild>
                <Link href="/sandbox/golf" className="flex items-center gap-2">
                  <CardStackIcon />
                  <span>Golf</span>
                </Link>
              </CommandItem>
              <CommandItem
                value="simulator"
                className="flex items-center gap-2"
              >
                <TransformIcon />
                <span>Simulator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
