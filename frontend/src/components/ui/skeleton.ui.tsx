import type { ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div">;

const Skeleton = ({ className = "", ...props }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-surface-container-high ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
