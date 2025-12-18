import React, { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import Loader from "./pages/loader/Loader";

const InitStore = ({ children }: { children: React.ReactNode }) => {
  const { loading, refreshSession } = useAuthStore();

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default InitStore;
