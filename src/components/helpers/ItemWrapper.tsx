import React from "react";

interface PageItemWrapperProps {
  className?: string;
  display?: string;
  flexDirection?: string;
  alighItems?: string;
  maxWidth?: string;
  margin?: string;
  children?: React.ReactNode;
}

export const PageItemWrapper: React.FC<PageItemWrapperProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};
