import { HTMLAttributes } from "react";

export type TagProps = HTMLAttributes<HTMLDivElement>;

export const Tag = ({ children, ...props }: TagProps) => {
  return (
    <div
      className="transition-all bg-white shadow-md rounded-lg px-2 py-1 text-xs flex text-black mr-2 whitespace-pre"
      {...props}
    >
      {children}
    </div>
  );
};
