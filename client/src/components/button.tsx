import { HTMLAttributes } from "react";

export type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="transition-all bg-black hover:bg-white hover:text-black hover:scale-110 transform px-4 py-3 rounded-lg shadow-md no-underline flex"
      {...props}
    >
      {children}
    </button>
  );
};
