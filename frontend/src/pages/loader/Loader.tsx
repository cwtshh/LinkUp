import { Spinner } from "@heroui/react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
