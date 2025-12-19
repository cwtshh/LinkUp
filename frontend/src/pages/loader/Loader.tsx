import { Spinner } from "@heroui/react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
