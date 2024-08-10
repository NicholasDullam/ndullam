import { HTMLProps } from "react";
import styled from "styled-components";
import { LoadingIcon } from ".";

const Container = styled.div`
  animation-name: fade;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-delay: 2s;
  animation-fill-mode: forwards;

  @keyframes fade {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

export type LoadingProps = Omit<HTMLProps<HTMLDivElement>, "children">;

export const Loading = ({ ...props }: LoadingProps) => {
  return (
    <Container
      className="fixed h-full w-full bg-black z-50 top-0 left-0 flex justify-center items-center"
      {...props}
    >
      <LoadingIcon size={20} />
    </Container>
  );
};

export default Loading;
