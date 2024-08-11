import { HTMLAttributes } from "react";

export type ElementProps = {
  name: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const Element = ({ name, ...props }: ElementProps) => {
  return (
    <div className="cursor-pointer flex group" {...props}>
      <div className="flex gap-2 items-center opacity-50 justify-items-start group-hover:opacity-100 transition-all">
        <div className="h-0 w-3 group-hover:w-10 border-b border-white transition-all duration-300" />
        <span className="text-sm sm:text-xs">{name}</span>
      </div>
    </div>
  );
};
