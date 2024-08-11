import { ReactNode } from "react";
import { Home } from "./_components/home";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Home />
    </>
  );
}
