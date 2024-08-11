type SquareProps = {
  size: number;
  delay?: number;
};

const Square = ({ size, delay }: SquareProps) => {
  return (
    <rect
      className="animate-grow fill-white transform scale-100"
      style={{ width: size, height: size, animationDelay: `${delay}ms` }}
    />
  );
};

export type LoadingIconProps = {
  size: number;
};

export const LoadingIcon = ({ size = 20 }: LoadingIconProps) => {
  return (
    <svg style={{ width: `${size * 4}px`, height: `${size * 4}px` }}>
      <Square size={size} />
      <Square size={size} delay={750} />
      <Square size={size} delay={750} />
    </svg>
  );
};
