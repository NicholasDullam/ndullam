import { Metadata } from "next";
import { ReactNode } from "react";
import { Home } from "./_components/home";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Development Lead",
  description: "A portfolio by Nicholas Dullam",
};

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
