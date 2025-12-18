import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
