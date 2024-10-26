import { Metadata } from "next";
import { ReactNode } from "react";
import { ProjectListDialog } from "./_components/project-list-dialog";

export const metadata: Metadata = {
  title: "Nicholas Dullam - Projects",
  description: "Project listings",
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <ProjectListDialog />
    </>
  );
}
