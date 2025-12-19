import { useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, navigate, loading]);

  if (loading) return null;

  if (!user) return null;

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
