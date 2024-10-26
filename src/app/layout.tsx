import { ReactNode } from "react";

import "../../index.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
