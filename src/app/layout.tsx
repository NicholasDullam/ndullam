import { ReactNode } from "react";
import { Home } from "./_components/home";

import "../../index.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
        <Home />
      </body>
    </html>
  );
}
