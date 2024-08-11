import Link from "next/link";
import { DashboardLink } from "../../components";
import { Element } from "./element";

export type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
    <div className="px-4 pb-4 pt-2 text-white">
      <div className="flex flex-col mb-3">
        <h4 className="text-lg sm:text-sm -mb-1">Nicholas Dullam</h4>
        <h4 className="text-md sm:text-xs opacity-50">Development Lead</h4>
      </div>
      <div className="flex gap-2">
        {/* Socials */}
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

        {/* Navigation */}
        <div className="flex flex-col">
          <Link href="/projects">
            <Element name="Projects" />
          </Link>
          <Element name="Sandbox" />
          <Element name="Contact" />
        </div>
      </div>
    </div>
  );
};
