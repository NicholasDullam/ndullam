import { HTMLAttributes } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export type DashboardLinkProps = {
  name: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const DashboardLink = ({ name, ...props }: DashboardLinkProps) => {
  return (
    <div className="flex relative group text-sm" {...props}>
      <span>{name}</span>
      <FiArrowUpRight />
      <span className="border-b border-white h-[1px] group-hover:w-full w-0 transition-all duration-300 absolute bottom-0 left-0" />
    </div>
  );
};
