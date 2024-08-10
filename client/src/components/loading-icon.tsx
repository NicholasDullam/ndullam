import styled from "styled-components";

const Square = styled.rect<{ delay?: number; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  fill: white;

  transform: scale(1);

  animation-name: grow;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || 0}ms;

  @keyframes grow {
    from {
      transform: scale(1);
      opacity: 0.5;
      border-radius: 0px;
    }

    50% {
      transform: scale(2);
      opacity: 1;
      border-radius: 2px;
    }

    to {
      transform: scale(1);
      opacity: 0.5;
      border-radius: 0px;
    }
  }
`;

export type LoadingIconProps = {
  size: number;
};

export const LoadingIcon = ({ size = 20 }: LoadingIconProps) => {
  return (
    <svg style={{ width: `${size * 4}px`, height: `${size * 4}px` }}>
      <Square size={size} />
      <Square size={size} y={size} delay={750} />
      <Square size={size} x={size} delay={750} />
    </svg>
  );
};
