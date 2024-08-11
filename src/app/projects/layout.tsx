import { ReactNode } from "react";
import { ProjectListDialog } from "./_components/project-list-dialog";

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
