import { ReactNode } from "react";
import { ProjectEntryDialog } from "./_components/project-entry-dialog";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <ProjectEntryDialog>{children}</ProjectEntryDialog>;
}
