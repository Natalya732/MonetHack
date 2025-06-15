import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return <>
  <Header/>
  <div className="px-3 lg:px-14">{children}</div>
  </>;
}