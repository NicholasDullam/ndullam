import { HTMLProps } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export type DashboardLinkProps = {
  name: string;
} & Omit<HTMLProps<HTMLAnchorElement>, "children">;

export const DashboardLink = ({ name, ...props }: DashboardLinkProps) => {
  return (
    <div>
      <a className="flex relative group" {...props}>
        {name}
        <FiArrowUpRight />
        <span className="border-b border-white h-[1px] group-hover:w-full w-0 transition-all duration-300" />
      </a>
    </div>
  );
};
