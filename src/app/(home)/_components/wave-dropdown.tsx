"use client";

import { TbEaseInControlPoint } from "react-icons/tb";

export type WaveDropdownProps = {};

export const WaveDropdown = ({}: WaveDropdownProps) => {
  return (
    <button className="rounded-lg p-2 text-zinc-400 bg-zinc-950 border border-zinc-900 hover:shadow-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all">
      <TbEaseInControlPoint size={16} />
    </button>
  );
};
