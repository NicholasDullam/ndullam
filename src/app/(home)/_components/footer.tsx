import Link from "next/link";
import { DashboardLink } from "../../../components";
import { Element } from "./element";

export type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
    <div className="px-3 pb-2 pt-2 flex text-white">
      <div>
        <div className="flex flex-col mb-3">
          <h4 className="text-lg -mb-1">Nicholas Dullam</h4>
          <h4 className="text-md opacity-50">Development Lead</h4>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <Link href="https://github.com/NicholasDullam" target="_blank">
              <DashboardLink name="GitHub" />
            </Link>
            <Link href="https://www.linkedin.com/in/ndullam/" target="_blank">
              <DashboardLink name="LinkedIn" />
            </Link>
            <Link
              href="https://stackoverflow.com/users/12109958/nicholas-dullam"
              target="_blank"
            >
              <DashboardLink name="Stack" />
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href="/projects">
              <Element name="Projects" />
            </Link>
            <Link href="/sandbox">
              <Element name="Sandbox" />
            </Link>
            <Link href="/assets/documents/resume.pdf">
              <Element name="Resume" />
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-auto mt-auto">
        <Link href="https://github.com/NicholasDullam/ndullam" target="_blank">
          <DashboardLink name="View source" />
        </Link>
      </div>
    </div>
  );
};
