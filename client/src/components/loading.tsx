import { HTMLAttributes } from "react";
import { LoadingIcon } from ".";

export type LoadingProps = Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const Loading = ({ ...props }: LoadingProps) => {
  return (
    <div className="animate-fade [animation-delay:2s]" {...props}>
      <LoadingIcon size={20} />
    </div>
  );
};
