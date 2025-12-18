import React from "react";
import Header from "./header/Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default BaseLayout;
