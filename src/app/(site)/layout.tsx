import SiteLayout from "@/components/layouts/site/Layout";
import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}

export default MainLayout;
