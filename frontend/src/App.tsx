import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import BaseLayout from "./components/BaseLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Landing from "./pages/landing/Landing";
import Meet from "./pages/meet/Meet";
function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/meet/:meet_code" element={<Meet />} />
        </Route>
      </Routes>
    </BaseLayout>
  );
}

export default App;
