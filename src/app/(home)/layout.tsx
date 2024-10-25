import { Metadata } from "next";
import { ReactNode } from "react";
import { Footer } from "./_components/footer";
import { ProgressWrapper } from "./_components/progress-wrapper";
import { WaveDropdown } from "./_components/wave-dropdown";
import { WaveProvider } from "./_components/wave-provider";
import { WaveWrapper } from "./_components/wave-wrapper";

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
      <WaveProvider>
        <div className="h-dvh overflow-hidden bg-black flex flex-col">
          <div className="fixed top-2 right-2">
            <WaveDropdown />
          </div>
          <WaveWrapper />
          <Footer />
        </div>
      </WaveProvider>
      <ProgressWrapper
        height="2px"
        color="#FFFFFF"
        shallowRouting
        options={{
          showSpinner: false,
        }}
      />
    </>
  );
}
