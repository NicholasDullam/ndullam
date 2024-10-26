import { HTMLAttributes } from "react";

export type TagProps = HTMLAttributes<HTMLDivElement>;

export const Tag = ({ children, ...props }: TagProps) => {
  return (
    <div
      className="transition-all bg-zinc-800 border border-zinc-700 text-white shadow-md rounded-lg px-2 py-1 text-xs flex whitespace-pre hover:border-zinc-300"
      {...props}
    >
      {children}
    </div>
  );
};
